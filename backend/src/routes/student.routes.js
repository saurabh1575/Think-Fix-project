const express = require("express");
const router = express.Router();

const {
  analyzeAnswer,
  getStudentHistory,
} = require("../controllers/student.controller");

const { authMiddleware } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

// ================================
// POST /api/student/analyze
// ================================
router.post(
  "/analyze",
  authMiddleware,
  allowRoles("student"),
  analyzeAnswer
);

// ================================
// GET /api/student/history
// ================================
router.get(
  "/history",
  authMiddleware,
  allowRoles("student"),
  getStudentHistory
);

module.exports = router;
