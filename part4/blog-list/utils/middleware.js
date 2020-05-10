const errorHandler = (err, request, response, next) => {
  if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message });
  }

  next(err);
};

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization');

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7);
  }

  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
};
