const pool  = require("../config");
const isUserExistDb = async (email) => {
  try {
    const {
      rows: dbEmail,
    } = await pool.query(
      "SELECT EXISTS (SELECT * from users where email = $1)",
      [email]
    );

    return dbEmail[0].exists;
  } catch (error) {
    return error;
  }
};

const isValidTokenDb = async ({ token, email, curDate }) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT EXISTS(select * from public."resetTokens" 
      where token = $1 AND email = $2 AND expiration > $3 AND used = $4)
    `,
      [token, email, curDate, false]
    );
    return rows[0].exists;
  } catch (error) {
    return error;
  }
};

const createResetTokenDb = async ({ email, expireDate, fpSalt }) => {
  try {
    await pool.query(
      `insert into public."resetTokens" (email, expiration, token) values ($1, $2, $3)`,
      [email, expireDate, fpSalt]
    );

    return true;
  } catch (error) {
    return error;
  }
};

const setTokenStatusDb = async (email) => {
  try {
    await pool.query(
      `update public."resetTokens" set used = $1 where email = $2`,
      [true, email]
    );

    return true;
  } catch (error) {
    return error;
  }
};

const deleteResetTokenDb = async (curDate) => {
  try {
    await pool.query(
      `delete from public."resetTokens" where expiration <= $1`,
      [curDate]
    );
    return true;
  } catch (error) {
    return error;
  }
};

module.exports = {
  isUserExistDb,
  isValidTokenDb,
  createResetTokenDb,
  setTokenStatusDb,
  deleteResetTokenDb,
};
