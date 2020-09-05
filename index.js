const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

const mongoose = require('mongoose');
const db = require('./config/mongoose');

const expressLayouts = require('express-ejs-layouts');
const expressPartials = require('express-partial');
const sassMiddleware = require('node-sass-middleware');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

app.use(expressLayouts);
app.use(expressPartials());
// use express router
app.use(
  sassMiddleware({
    src: path.join(__dirname, './assests', 'scss'),
    dest: path.join(__dirname, './assests', 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
  })
);

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./assests'));

app.use(
  session({
    name: 'CareerCamp',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: 'disabled',
      },
      function (err) {
        if (err) {
          console.log('Error in Mongo store');
          return;
        }
        console.log('Working');
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error while listening to port: ', port);
    console.log(err);
    return;
  }
  console.log('Server is up and running');
});
