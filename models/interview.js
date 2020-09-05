const mongoose = require('mongoose');

const interviewSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
