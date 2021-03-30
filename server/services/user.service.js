const {
  createUserDb,
  getUserByEmailDb,
  createUserGoogleDb,
  changeUserPasswordDb,
  getUserByIdDb,
  updateUserDb,
  deleteUserDb,
  getAllUsersDb,
  getUserByUsernameDb,
} = require("../db/user.db");

class UserService {
  createUser = async (user) => {
    const modifiedUser = { ...user, email: user.email.toLowerCase() };
    try {
      return await createUserDb(modifiedUser);
    } catch (error) {
      throw error;
    }
  };
  getUserByEmail = async (email) => {
    try {
      return await getUserByEmailDb(email.toLowerCase());
    } catch (error) {
      throw error;
    }
  };
  getUserById = async (id) => {
    try {
      return await getUserByIdDb(id);
    } catch (error) {
      throw error;
    }
  };
  createGoogleAccount = async (user) => {
    try {
      return await createUserGoogleDb(user);
    } catch (error) {
      throw error;
    }
  };
  changeUserPassword = async (password, email) => {
    try {
      return await changeUserPasswordDb(password, email);
    } catch (error) {
      throw error;
    }
  };
  updateUser = async (user) => {
    const { email, username, id } = user;
    try {
      const getUser = await getUserByIdDb(id);
      const findUserByEmail = await getUserByEmailDb(email);
      const findUserByUsername = await getUserByUsernameDb(username);
      const emailChanged =
        email && getUser.email !== email;
      const usernameChanged =
        username && getUser.username !== username;
      const errors = {};

      if (emailChanged && typeof findUserByEmail === "object") {
        errors["email"] = `Email is already taken`;
      }
      if (usernameChanged && typeof findUserByUsername === "object") {
        errors["username"] = `Username is already taken`;
      }

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      return await updateUserDb(user);
    } catch (error) {
      throw error;
    }
  };

  deleteUser = async (id) => {
    try {
      return await deleteUserDb(id);
    } catch (error) {
      throw error;
    }
  };

  getAllUsers = async (id) => {
    try {
      return await getAllUsersDb();
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new UserService();
