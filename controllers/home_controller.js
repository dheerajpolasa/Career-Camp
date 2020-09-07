const Student = require('../models/student');
const Interview = require('../models/interview');

module.exports.home = async function (req, res) {
  try {
    const students = await Student.find({});

    const interviews = await Interview.find({}).populate('student');

    return res.render('home', {
      students: students,
      interviews: interviews,
    });
  } catch (err) {}
};
