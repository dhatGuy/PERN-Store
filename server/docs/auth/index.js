const login = require("./login");
const signup = require("./signup");

module.exports = {
  "/auth/login": {
    ...login,
  },
  "/auth/signup": {
    ...signup,
  },
};
