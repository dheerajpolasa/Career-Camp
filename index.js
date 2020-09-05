const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

const mongoose = require('mongoose');
const db = require('./config/mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes'));

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error while listening to port: ', port);
    console.log(err);
    return;
  }
  console.log('Server is up and running');
});
