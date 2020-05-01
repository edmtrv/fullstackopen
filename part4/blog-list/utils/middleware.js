const errorHandler = (err, request, response, next) => {
  if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message });
  }

  next(err);
};

module.exports = {
  errorHandler,
};
