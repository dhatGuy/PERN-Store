const { ErrorHandler } = require("../helpers/error");

// eslint-disable-next-line no-unused-vars
const unknownEndpoint = (request, response) => {
  throw new ErrorHandler(401, "unknown endpoint");
};

module.exports = unknownEndpoint;
