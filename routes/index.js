const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

// To handle all the student routes
router.use('/student', require('./student'));

// To handle all the employee routes
router.use('/employee', require('./employee'));

// To handle all the interview routes
router.use('/interview', require('./interview'));

// To handle all the job routes
router.use('./jobs', require('./jobs'));

module.exports = router;
