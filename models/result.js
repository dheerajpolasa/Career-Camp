const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true,
  },
  result: {
    type: String,
    enum: ['PASS', 'FAILED', 'On Hold', 'Did not Attempt'],
  },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
