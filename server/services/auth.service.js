const bcrypt = require("bcrypt");
const { setTokenStatusDb, createResetTokenDb, deleteResetTokenDb, isValidTokenDb } = require("../db/auth.db");

class AuthService {
  async hashPassword(password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async comparePassword(password, passwordHash) {
    return await bcrypt.compare(password, passwordHash);
  }

  async setTokenStatus(email){
    try {
      return await setTokenStatusDb(email);
    } catch (error) {
      throw error;
    }
  }

  async createResetToken(data){
    try {
      return await createResetTokenDb(data);
    } catch (error) {
      throw error;
    }
  }
  async deleteResetToken(date){
    try {
      return await deleteResetTokenDb(date);
    } catch (error) {
      throw error;
    }
  }
  async isTokenValid(data){
    try {
      return await isValidTokenDb(data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
