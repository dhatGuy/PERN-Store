const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  response.status(error.status || 500).json({
    error: error.message,
  });

  next(error);
};

module.exports = errorHandler;
