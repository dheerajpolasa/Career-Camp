const express = require('express');
const router = express.Router();

const interviewController = require('../controllers/interview_controller');

// Route to create the new interview
router.post('/create', interviewController.create);

// Route to fetch the interview
router.get('/:id', interviewController.fetchOne);

// Route to download file
router.get('/download/all', interviewController.downloadFile);

// Route to update the interview status
router.post('/update/:id', interviewController.update);

module.exports = router;
