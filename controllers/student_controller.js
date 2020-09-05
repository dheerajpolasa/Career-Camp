const Student = require('../models/student');

module.exports.create = async function (req, res) {
  try {
    const student = await Student.create({
      name: 'Dheeraj',
      email: 'test@gmail.com',
      password: '123',
      college: 'LPU',
      batch: '2020',
      phoneNumber: '999999999',
    });

    console.log('Student created ', student);

    return res.send(student);
  } catch (err) {
    return res.send(`Error ${err}`);
  }
};
