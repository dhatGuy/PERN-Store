class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.status = "error";
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, req, res, next) => {
  const { statusCode, message } = err;
  // console.log(err)
  res.status(statusCode || 500).json({
    status: "error",
    statusCode: statusCode || 500,
    message,
  });
  next();
};
module.exports = {
  ErrorHandler,
  handleError,
};
