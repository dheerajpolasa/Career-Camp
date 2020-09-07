const path = require('path');
const Interview = require('../models/interview');
const Student = require('../models/student');
const ObjectsToCsv = require('objects-to-csv');

module.exports.create = async function (req, res) {
  try {
    console.log(req.body);
    let interview = await Interview.create(req.body);

    interview = await interview.populate('student').execPopulate();

    let student = await Student.findById(req.body.student);
    student.interviews.push(interview);
    student.save();
    if (req.xhr) {
      return res.json(201, {
        data: {
          interview: interview,
        },
      });
    }

    return res.redirect('back');
  } catch (err) {}
};

module.exports.fetchOne = async function (req, res) {
  try {
    const interview = await Interview.findById(req.params.id).populate(
      'student'
    );

    if (!interview) {
      if (req.xhr) {
        return res.json(400, {
          message: 'Interview not found',
        });
      }
    }

    if (req.xhr) {
      return res.json(201, {
        data: {
          interview: interview,
        },
      });
    }

    return res.redirect('back');
  } catch (err) {}
};

module.exports.downloadFile = async function (req, res) {
  try {
    console.log('Hey');
    const interviews = await Interview.find({}).populate('student');
    console.log(interviews);
    let interviewsArray = interviews.map((interview) => ({
      Student_ID: interview.student.id,
      Student_Name: interview.student.name,
      Student_college: interview.student.college,
      Student_Status: interview.student.status,
      DSA_Final_Score: interview.student.dsa_final_score,
      WebD_Final_Score: interview.student.webd_final_score,
      React_Final_Score: interview.student.react_final_score,
      Interview_Company: interview.company,
      Interview_Date: new Date(interview.date).toDateString(),
      Result: interview.result,
    }));

    const csv = new ObjectsToCsv(interviewsArray);

    await csv.toDisk('./assests/downloads/student-interview-csv.csv');

    console.log('Generated file');

    // res.sendFile(path.join(__dirname) + '/..' + '/assests/downloads/list.csv');

    return res.send(
      '<a href="/downloads/student-interview-csv.csv" download="student-interview-csv.csv" id="download-csv-file"></a><script>document.getElementById("download-csv-file").click()</script>'
    );
  } catch (err) {}
};

module.exports.update = async function (req, res) {
  try {
    const id = req.params.id;

    let interview = await Interview.findById(id);

    interview.result = req.body.result;
    interview.save();

    if (req.xhr) {
      return res.json(201, {
        message: 'Updated successfully',
      });
    }

    return res.redirect('back');
  } catch (err) {}
};
