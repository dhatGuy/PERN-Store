import crypto from "crypto";
import { db } from "~/database";
import { ValidationError } from "~/helpers/error";
import {
  forgotPasswordMail,
  resetPasswordMail,
  signupMail,
} from "~/services/mail.service";
import * as authUtils from "~/utils/auth";
import { LoginInput, ResetPasswordInput, SignUpInput } from "./auth.schema";

export class AuthService {
  async signUp(input: SignUpInput) {
    const hashedPassword = await authUtils.hashPassword(input.password);

    // check if user email exists
    const [checkEmail, checkUsername] = await Promise.all([
      db
        .selectFrom("user")
        .select(["id"])
        .where("email", "=", input.email)
        .executeTakeFirst(),
      db
        .selectFrom("user")
        .select(["id"])
        .where("username", "=", input.username)
        .executeTakeFirst(),
    ]);

    const validationErrors = [];
    if (checkEmail) {
      validationErrors.push({
        id: "email",
        error: "Email is already registered",
      });
    }

    if (checkUsername) {
      validationErrors.push({
        id: "username",
        error: "Username is already taken",
      });
    }

    if (validationErrors.length > 0) {
      throw new ValidationError("Validation error", validationErrors);
    }

    const user = await db
      .insertInto("user")
      .values({
        ...input,
        password: hashedPassword,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    const cart = await db
      .insertInto("cart")
      .values({ user_id: user.id })
      .returning("id")
      .executeTakeFirstOrThrow();

    const token = authUtils.signToken({
      id: user.id,
      roles: user.roles,
      cart_id: cart.id,
    });

    const refreshToken = authUtils.signRefreshToken({
      id: user.id,
      // roles: user[0].roles,
      // cart_id: user[0].cart_id,
    });

    signupMail(user.email, user.fullname.split(" ")[0]);

    return {
      user,
      token,
      refreshToken,
    };
  }

  async login(input: LoginInput) {
    const user = await db
      .selectFrom("user")
      .fullJoin("cart", "cart.user_id", "user.id")
      .selectAll("user")
      .select("cart.id as cart_id")
      .where("email", "=", input.email)
      .executeTakeFirst();

    if (!user) {
      throw new Error("Email or password incorrect");
    }

    if (user.google_id && !user.password) {
      throw new Error("Login in with Google");
    }

    const isCorrectPassword = await authUtils.comparePassword(
      input.password,
      user.password ?? ""
    );

    if (!isCorrectPassword) {
      throw new Error("Email or password incorrect");
    }

    const token = authUtils.signToken({
      id: user.id,
      roles: user.roles,
      cart_id: user.cart_id,
    });

    const refreshToken = authUtils.signRefreshToken({
      id: user.id,
      // roles: user.roles,
      // cart_id: user.cart_id,
    });

    return {
      user,
      token,
      refreshToken,
    };
  }

  async googleLogin(code: string) {
    const ticket = await authUtils.verifyGoogleIdToken(code);
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new Error("Invalid Google token");
    }
    const { name, email, sub } = payload;
    const defaultUsername =
      name?.replace(/ /g, "").toLowerCase() ?? email?.split("@")[0] ?? "";

    let user = await db
      .selectFrom("user")
      .fullJoin("cart", "cart.user_id", "user.id")
      .selectAll("user")
      .select("cart.id as cart_id")
      .where("email", "=", email ?? "")
      .executeTakeFirstOrThrow();

    if (!user?.google_id) {
      user = await db
        .insertInto("user")
        .columns(["google_id", "username", "email", "fullname"])
        .values({
          google_id: sub,
          username: defaultUsername,
          email,
          fullname: name ?? defaultUsername,
        })
        .onConflict((oc) =>
          oc.column("email").doUpdateSet({ google_id: sub, fullname: name })
        )
        .returningAll()
        .returning((eb) => [
          eb
            .selectFrom("user")
            .innerJoin("cart", "cart.user_id", "user.id")
            .select(["cart.id"])
            .as("cart_id"),
        ])
        .executeTakeFirstOrThrow();

      if (user.email && user.fullname) {
        signupMail(user?.email, user?.fullname.split(" ")[0]);
      }
    }

    let cart;
    if (!user.cart_id && user.id) {
      cart = await db
        .insertInto("cart")
        .values({ user_id: user.id })
        .returning("id")
        .executeTakeFirstOrThrow();
    }

    const token = authUtils.signToken({
      id: user.id,
      roles: user.roles,
      cart_id: user.cart_id ?? cart?.id,
    });

    const refreshToken = authUtils.signRefreshToken({
      id: user.id,
      // roles: user.roles,
      // cart_id: user.cart_id,
    });

    return {
      user,
      token,
      refreshToken,
    };
  }
  async forgotPassword(email: string) {
    const user = await db
      .selectFrom("user")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();

    if (!user) {
      return;
    }

    await db
      .updateTable("reset_token")
      .set({ used: true })
      .where("email", "=", email)
      .execute();

    const fpSalt = crypto.randomBytes(64).toString("base64");

    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 1);

    await db
      .insertInto("reset_token")
      .values({
        email,
        expiration: expireDate,
        token: fpSalt,
      })
      .execute();

    await forgotPasswordMail(fpSalt, email);
  }

  async verifyPasswordResetToken(token: string, email: string) {
    await db
      .deleteFrom("reset_token")
      .where("expiration", "<=", new Date())
      .execute();
    const resetToken = await db
      .selectFrom("reset_token")
      .selectAll()
      .where("token", "=", token)
      .where("email", "=", email)
      .where("used", "=", false)
      .executeTakeFirst();

    return Boolean(resetToken);
  }

  async resetPassword({ password, token, email }: ResetPasswordInput) {
    const resetToken = await db
      .selectFrom("reset_token")
      .selectAll()
      .where("token", "=", token)
      .where("expiration", ">=", new Date())
      .where("email", "=", email)
      .where("used", "=", false)
      .executeTakeFirst();

    if (!resetToken) {
      throw new Error("Invalid token");
    }

    await db
      .updateTable("reset_token")
      .set({ used: true })
      .where("id", "=", resetToken.id)
      .execute();

    const hashedPassword = await authUtils.hashPassword(password);
    await db
      .updateTable("user")
      .set({ password: hashedPassword })
      .where("email", "=", email)
      .execute();

    resetPasswordMail(email);
  }

  async refreshAuthToken(refreshToken: string) {
    const payload = authUtils.verifyRefreshToken(refreshToken);
    const user = await db
      .selectFrom("user")
      .innerJoin("cart", "cart.user_id", "user.id")
      .selectAll("user")
      .select("cart.id as cart_id")
      .where("user.id", "=", payload.id)
      .executeTakeFirst();

    if (!user) {
      throw new Error("User not found");
    }

    const token = authUtils.signToken({
      id: user.id,
      roles: user.roles,
      cart_id: user.cart_id,
    });

    const newRefreshToken = authUtils.signRefreshToken({
      id: user.id,
      // roles: user.roles,
      // cart_id: user.cart_id,
    });

    return {
      user,
      token,
      refreshToken: newRefreshToken,
    };
  }

  async getCurrentUser(id: string) {
    return await db
      .selectFrom("user")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  }
}
