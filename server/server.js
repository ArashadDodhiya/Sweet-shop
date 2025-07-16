const app = require('./app');
const env = require('./config/env');

const PORT = env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});