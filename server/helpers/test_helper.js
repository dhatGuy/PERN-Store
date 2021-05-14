const pool = require("../config");

const usersInDb = async () => {
  const users = await pool.query("SELECT * FROM USERS");
  return users.rows;
};

module.exports = { usersInDb };
