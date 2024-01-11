const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
// TODO: CHECK THE CONNECTION IS CORRECT COMPARE TO MINI PROJECT IN noSQL
mongoose.connect(
  'mongodb+srv://admin:Password123!@cluster0.53nmbtc.mongodb.net/?retryWrites=true&w=majority',
);

// Export connection
module.exports = mongoose.connection;
