const Student = require('../models/student');
const ObjectsToCsv = require('objects-to-csv');

module.exports.create = async function (req, res) {
  try {
    console.log(req.body);
    const student = await Student.create(req.body);

    console.log('Student created ', student);

    if (req.xhr) {
      return res.json(201, {
        data: {
          student: student,
        },
        message: 'Student created..!',
      });
    }
  } catch (err) {
    return res.send(`Error ${err}`);
  }
};

module.exports.fetchOne = async function (req, res) {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);

    if (!student) {
      if (req.xhr) {
        return res.json(400, {
          message: 'Not found',
        });
      }
      return res.redirect('back');
    }

    if (req.xhr) {
      return res.json(201, {
        data: {
          student: student,
        },
        message: 'Successful',
      });
    }

    return res.redirect('back');
  } catch (err) {}
};

module.exports.fetchAll = async function (req, res) {
  try {
    const students = await Student.find({});
    console.log('in fetch all');
    if (req.xhr) {
      return res.json(201, {
        data: {
          students: students,
        },
        message: 'Fetched all students',
      });
    }

    return res.send(students);
  } catch (err) {}
};

module.exports.downloadFile = async function (req, res) {
  try {
    const students = await Student.find({}).populate({ path: 'interviews' });

    // let interviewsArray = ;

    // let interviews = student.interviews;
    // let interviewsArray = interviews.map((interview) => ({
    //   company: interview.company,
    //   date: interview.date,
    // }));

    let studentsArray = students.map((student) => ({
      name: student.name,
      email: student.email,
      college: student.college,
      status: student.status,
      interviews: new ObjectsToCsv(
        student.interviews.map((interview) => ({
          company: interview.company,
          date: new Date(interview.date).toDateString(),
        }))
      ),
    }));

    console.log(studentsArray);
    const csv = new ObjectsToCsv(studentsArray);

    await csv.toDisk('./list.csv');

    console.log('Generated file');
  } catch (err) {}
};
