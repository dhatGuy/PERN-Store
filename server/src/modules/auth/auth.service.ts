import crypto from "crypto";
import { db } from "~/database";
import { UserExistsError } from "~/helpers/error";
import * as authUtils from "~/utils/auth";
import {
  LoginInput,
  loginSchema,
  ResetPasswordInput,
  SignUpInput,
  signUpSchema,
} from "./auth.schema";

export class AuthService {
  async signUp(input: SignUpInput) {
    signUpSchema.parse(input);

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

    if (checkEmail) {
      throw new UserExistsError("Email is already registered", "email");
    }

    if (checkUsername) {
      throw new UserExistsError("Username is already taken", "username");
    }

    const user = await db
      .insertInto("user")
      .values({
        ...input,
        password: hashedPassword,
      })
      .returningAll()
      .executeTakeFirst();

    if (!user) {
      throw new Error("Failed to create user");
    }

    // TODO: create cart for user

    const token = authUtils.signToken({
      id: user.id,
      roles: user.roles,
      // cart_id: user[0].cart_id,
    });

    const refreshToken = authUtils.signRefreshToken({
      id: user.id,
      // roles: user[0].roles,
      // cart_id: user[0].cart_id,
    });

    return {
      user,
      token,
      refreshToken,
    };
  }

  async login(input: LoginInput) {
    loginSchema.parse(input);

    const user = await db
      .selectFrom("user")
      .selectAll()
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
      // cart_id: user.cart_id,
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
    const { name, email, sub } = ticket.getPayload();
    const defaultUsername = name.replace(/ /g, "").toLowerCase();

    let user = await db
      .selectFrom("user")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();

    if (!user?.google_id) {
      user = await db
        .insertInto("user")
        .values({
          google_id: sub,
          username: defaultUsername,
          email,
          fullname: name,
        })
        .onConflict((oc) =>
          oc.column("email").doUpdateSet({ google_id: sub, fullname: name })
        )
        .returningAll()
        .executeTakeFirst();
    }

    if (!user) {
      throw new Error("Something went wrong");
    }

    const token = authUtils.signToken({
      id: user.id,
      roles: user.roles,
      // cart_id: user.cart_id,
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
      throw new Error("User not found");
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

    // TODO: send email
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

    // TODO: send email
  }

  async refreshAuthToken(refreshToken: string) {
    const payload = authUtils.verifyRefreshToken(refreshToken);
    const user = await db
      .selectFrom("user")
      .selectAll()
      .where("id", "=", payload.id)
      .executeTakeFirst();

    if (!user) {
      throw new Error("User not found");
    }

    const token = authUtils.signToken({
      id: user.id,
      roles: user.roles,
      // cart_id: user.cart_id,
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
}
