const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const env = require('./config/env');

// Route files
const sweets = require('./routes/sweetRoutes');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/sweets', sweets);

// Error handler middleware
app.use(errorHandler);

module.exports = app;