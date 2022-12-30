const pool = require("../config");

const isValidTokenDb = async ({ token, email, curDate }) => {
  const { rows } = await pool.query(
    `
      SELECT EXISTS(select * from public."resetTokens" 
      where token = $1 AND email = $2 AND expiration > $3 AND used = $4)
    `,
    [token, email, curDate, false]
  );
  return rows[0].exists;
};

const createResetTokenDb = async ({ email, expireDate, fpSalt }) => {
  await pool.query(
    'insert into public."resetTokens" (email, expiration, token) values ($1, $2, $3)',
    [email, expireDate, fpSalt]
  );

  return true;
};

const setTokenStatusDb = async (email) => {
  await pool.query(
    'update public."resetTokens" set used = $1 where email = $2',
    [true, email]
  );

  return true;
};

const deleteResetTokenDb = async (curDate) => {
  await pool.query('delete from public."resetTokens" where expiration <= $1', [
    curDate,
  ]);
  return true;
};

module.exports = {
  isValidTokenDb,
  createResetTokenDb,
  setTokenStatusDb,
  deleteResetTokenDb,
};
