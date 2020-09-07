const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    college: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Placed', 'Not Placed'],
    },
    batch: {
      type: String,
      required: true,
    },
    dsa_final_score: {
      type: Number,
    },
    webd_final_score: {
      type: Number,
    },
    react_final_score: {
      type: Number,
    },
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
