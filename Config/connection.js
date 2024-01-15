const { connect, connection } = require('mongoose');

//? The acceptance criteria does not say I need to deploy to heroku. Do I need to? and where is connection being exported to or required. 

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

connect(connectionString);

module.exports = connection;