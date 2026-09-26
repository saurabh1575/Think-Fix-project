const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  student_id: String,
  question_id: String,
  answerText: String,

  diagnosis: {
    errorType: String,
    misconception: String,
    explanation: String
  },

  response: {
    priority: String,
    nextSteps: [String]
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Attempt", attemptSchema);
