const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Employee = require('../models/employee');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      Employee.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              console.log('Matched');
              return done(null, user);
            }
            return done(null, false);
          });
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

// serialize the user to decide which key to be kept in the cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialize the user from key in the cookies
passport.deserializeUser(function (id, done) {
  Employee.findById(id, function (err, user) {
    if (err) {
      console.log('Error in finding user');
      return done(err);
    }
    console.log('Retrived user');
    return done(null, user);
  });
});

// Check if employee is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/employee/sign-in');
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
