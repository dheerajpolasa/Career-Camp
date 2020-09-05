const mongoose = require('mongoose');
const env = require('../config/environment');

// Connect to db
mongoose.connect(
  `mongodb+srv://${env.db_username}:${env.db_password}@${env.db_cluster}/${env.db}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Acquire the connection
const db = mongoose.connection;

// Error
db.on('error', console.error.bind(console, 'Error connecting to db'));

// Up and running
db.once('open', () => {
  console.log('Succesfully connected to the database');
});

module.exports = db;
