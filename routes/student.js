const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student_controller');

// Route to create new student
router.post('/create', studentController.create);

// Route to fetch all the students
router.get('/all', studentController.fetchAll);

// Route to get the student students
router.get('/:id', studentController.fetchOne);

// Route to download csv
router.get('/download/all', studentController.downloadFile);

module.exports = router;
