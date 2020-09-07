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
    result: {
      type: String,
      enum: ['PASS', 'FAILED', 'On Hold', 'Did not Attempt'],
      default: 'On Hold',
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
