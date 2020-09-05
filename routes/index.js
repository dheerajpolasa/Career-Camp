const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student_controller');
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

// To handle all the student routes
router.use('/student', require('./student'));

// To handle all the employee routes
router.use('/employee', require('./employee'));

// To handle all the interview routes
router.use('/interview', require('./interview'));

// To handle all the result routes
router.use('/result', require('./result'));

// To handle all the API Routes

// To handle all the student routes
router.use('/api/v1/student', require('./api/v1/student'));

// To handle all the employee routes
router.use('/api/v1/employee', require('./api/v1/employee'));

// To handle all the interview routes
router.use('/api/v1/interview', require('./api/v1/interview'));

// To handle all the result routes
router.use('/api/v1/result', require('./api/v1/result'));

module.exports = router;
