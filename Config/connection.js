const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://HECTOR3:Canela123!3@cluster0.fqmol1x.mongodb.net/NetworkCalls?retryWrites=true&w=majority';

connect(connectionString);

module.exports = connection;