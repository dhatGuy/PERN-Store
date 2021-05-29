const getUser = require("./get-user");
const updateUser = require("./update-user");
const deleteUser = require("./delete-user");
const createUser = require("./create-user");
const getUsers = require("./get-users");

module.exports = {
  "/users": {
    ...getUsers,
    ...createUser,
  },
  "/users/{id}": {
    ...getUser,
    ...updateUser,
    ...deleteUser,
  },
};
