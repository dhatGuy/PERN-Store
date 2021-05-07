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
    try {
      return await createUserDb(user);
    } catch (error) {
      throw error;
    }
  };
  getUserByEmail = async (email) => {
    try {
      const user = await getUserByEmailDb(email);
      return user;
    } catch (error) {
      throw error;
    }
  };
  getUserByUsername = async (username) => {
    try {
      const user = await getUserByUsernameDb(username);
      return user;
    } catch (error) {
      throw error;
    }
  };
  getUserById = async (id) => {
    try {
      const user = await getUserByIdDb(id);
      user.password = undefined;
      user.google_id = undefined;
      user.cart_id = undefined;
      return user;
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
    const errors = {};
    try {
      const getUser = await getUserByIdDb(id);
      const findUserByEmail = await getUserByEmailDb(email);
      const findUserByUsername = await getUserByUsernameDb(username);
      const emailChanged =
        email && getUser.email.toLowerCase() !== email.toLowerCase();
      const usernameChanged =
        username && getUser.username.toLowerCase() !== username.toLowerCase();

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
