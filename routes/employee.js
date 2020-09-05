const express = require('express');
const router = express.Router();
const passport = require('passport');

const employeeController = require('../controllers/employee_controller');

// Route to render the sign up page
router.get('/sign-up', employeeController.signUp);

// Route to render the sign in page
router.get('/sign-in', employeeController.signIn);

// Route to create session of the employee
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/employee/sign-in' }),
  employeeController.createSession
);

// Route to create the employee
router.post('/create', employeeController.create);

// Route to destory the user session
router.get('/destroy-session', employeeController.destroySession);

module.exports = router;
