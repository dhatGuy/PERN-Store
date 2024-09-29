import { db } from "~/database";
import { UserExistsError } from "~/helpers/error";
import { CreateUserInput, UpdateUserInput } from "./user.schema";

export class UserService {
  createUser = async (data: CreateUserInput) => {
    const { password, username, email, ...rest } = data;

    const existingUser = await db
      .selectFrom("user")
      .where((eb) => eb("email", "=", email).or("username", "=", username))
      .select(["id", "username", "email"])
      .executeTakeFirst();

    if (existingUser) {
      if (
        existingUser.username.toLocaleLowerCase() ===
        username.toLocaleLowerCase()
      ) {
        throw new UserExistsError("Username is already taken", "username");
      }
      if (
        existingUser.email.toLocaleLowerCase() === email.toLocaleLowerCase()
      ) {
        throw new UserExistsError("Email is already registered", "email");
      }
    }

    const user = await db
      .insertInto("user")
      .values({
        ...rest,
        username,
        email,
        password,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return user;
  };
  getUserByEmail = async (email: string) => {
    const user = await db
      .selectFrom("user")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();
    return user;
  };
  getUserByUsername = async (username: string) => {
    const user = await db
      .selectFrom("user")
      .selectAll()
      .where("username", "=", username)
      .executeTakeFirst();
    return user;
  };
  getUserById = async (id: string) => {
    const user = await db
      .selectFrom("user")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
    return user;
  };
  // createGoogleAccount = async (user) => {
  //   try {
  //     return await createUserGoogleDb(user);
  //   } catch (error) {
  //     throw new ErrorHandler(error.statusCode, error.message);
  //   }
  // };
  changeUserPassword = async (password: string, email: string) => {
    const user = await db
      .updateTable("user")
      .set({ password })
      .where("email", "=", email)
      .returningAll()
      .executeTakeFirst();
  };

  updateUser = async (user: UpdateUserInput, id: string) => {
    const { email, username } = user;
    const errors: { [key: string]: string } = {};
    try {
      const getUser = await this.getUserById(id);
      const findUserByEmail = await this.getUserByEmail(email);
      const findUserByUsername = await this.getUserByUsername(username);
      const emailChanged =
        email && getUser?.email.toLowerCase() !== email.toLowerCase();
      const usernameChanged =
        username && getUser?.username.toLowerCase() !== username.toLowerCase();

      if (emailChanged && typeof findUserByEmail === "object") {
        errors["email"] = "Email is already taken";
      }
      if (usernameChanged && typeof findUserByUsername === "object") {
        errors["username"] = "Username is already taken";
      }

      if (Object.keys(errors).length > 0) {
        throw new Error(JSON.stringify(errors));
      }

      return await db
        .updateTable("user")
        .set(user)
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirst();
    } catch (error) {
      throw error;
    }
  };

  deleteUser = async (id: string) => {
    await db.deleteFrom("user").where("id", "=", id).executeTakeFirst();
  };

  getAllUsers = async () => {
    const users = await db.selectFrom("user").selectAll().execute();
    return users;
  };
}
