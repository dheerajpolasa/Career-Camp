const { hash } = require('bcryptjs');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const Employee = require('../../../models/employee');

module.exports.signUp = function (req, res) {
  try {
    return res.render('sign-up');
  } catch (err) {}
};

module.exports.signIn = function (req, res) {
  try {
    return res.render('sign-in');
  } catch (err) {}
};

module.exports.create = async function (req, res) {
  try {
    const employee = await Employee.findOne({ email: req.body.email });
    if (!employee) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await Employee.create({
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
      });

      return res.json(201, {
        message: 'User created',
      });
    }

    res.json(400, {
      message: 'User already exits...!',
    });
  } catch (err) {}
};

module.exports.createSession = function (req, res) {};
