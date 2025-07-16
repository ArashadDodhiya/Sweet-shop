const mongoose = require('mongoose');

const connectDB = async () => {
  // Only connect if we're not already connected
  if (mongoose.connection.readyState === 0) { // 0 = disconnected
    try {
      await mongoose.connect(process.env.MONGO_URI);
      // console.log('MongoDB Connected:', mongoose.connection.host);
    } catch (error) {
      console.error('MongoDB Connection Error:', error.message);
      process.exit(1);
    }
  }
};

module.exports = connectDB;