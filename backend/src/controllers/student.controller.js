const Attempt = require("../models/Attempt");
const { parseAnswer } = require("../services/parser.service");
const { diagnose } = require("../services/diagnosis.service");
const { generateResponse } = require("../services/response.service");

// ================================
// POST /api/student/analyze
// ================================
const analyzeAnswer = async (req, res) => {
  try {
    const { student_id, question_id, answerText } = req.body;

    if (!student_id || !question_id || !answerText) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const parsedAnswer = parseAnswer(answerText);
    const questionMeta = { needsDisplacement: true };

    const diagnosis = diagnose({ parsedAnswer, questionMeta });
    const response = generateResponse({ diagnosis });

    const attempt = await Attempt.create({
      student_id,
      question_id,
      answerText,
      diagnosis,
      response,
    });

    return res.json({
      message: "Answer analyzed successfully",
      attempt,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Saving attempt failed",
      details: err.message,
    });
  }
};

// ================================
// GET /api/student/history
// ================================
const getStudentHistory = async (req, res) => {
  try {
    const studentId = req.user.id; // JWT se aata hai

    const attempts = await Attempt.find({ student_id: studentId })
      .sort({ createdAt: -1 });

    return res.json(attempts);
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch history",
    });
  }
};

module.exports = {
  analyzeAnswer,
  getStudentHistory,
};
