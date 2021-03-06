const {
  createUserDb,
  getUserByEmailDb,
  createUserGoogleDb,
  changeUserPasswordDb,
  getUserByIdDb,
  updateUserDb,
  deleteUserDb,
  getAllUsersDb,
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
  getUserById = async (id) => {
    try {
      return await getUserByIdDb(id);
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
  updateUser = async (user) => {
    try {
      return await updateUserDb(user);
    } catch (error) {
      throw error;
    }
  };
  deleteUser = async (id) => {
    try {
      return await deleteUserDb(id)
    } catch (error) {
      throw error
    }
  };
  getAllUsers = async (id) =>{
    try {
      return await getAllUsersDb()
    } catch (error) {
      throw error
    }
  }
}

module.exports = new UserService();
