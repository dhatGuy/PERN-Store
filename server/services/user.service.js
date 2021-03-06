const {
  createUserDb,
  getUserByEmailDb,
  createUserGoogleDb,
  changeUserPasswordDb,
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
      return await getUserByEmailDb(email);
    } catch (error) {
      console.log(error);
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
}

module.exports = new UserService();
