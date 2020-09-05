const mongoose = require('mongoose');

// Connect to db
mongoose.connect(
  'mongodb+srv://career-camp:w7iWoeD3WGScivwP@cluster0-ggz5m.mongodb.net/career-camp?retryWrites=true&w=majority',
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
