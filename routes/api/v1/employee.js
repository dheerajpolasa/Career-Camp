const express = require('express');
const router = express.Router();

const employeeController = require('../../../controllers/api/v1/employee_controller');

// Route to render the sign up page
router.get('/sign-up', employeeController.signUp);

// Route to render the sign in page
router.get('/sign-in', employeeController.signIn);

// Route to create session of the employee
router.post('/create-session', employeeController.createSession);

// Route to create the employee
router.post('/create', employeeController.create);

module.exports = router;
