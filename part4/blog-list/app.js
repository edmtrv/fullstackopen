const express = require('express');
const cors = require('cors');
require('express-async-errors');
const app = express();
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err) => {
    logger.error('Error connecting to MongoDB', err.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use(middleware.errorHandler);

module.exports = app;
