const jwt = require("jsonwebtoken");

function generateAccessToken(data) {
  return jwt.sign(data, process.env.SECRET);
}

function generateRefreshToken(data) {
  return jwt.sign(data, process.env.SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
}
