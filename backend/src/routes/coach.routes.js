const express = require("express");
const router = express.Router();

const { classAnalysis } = require("../controllers/coach.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

// Only COACH can see class analysis
router.get(
  "/class-analysis",
  authMiddleware,
  allowRoles("coach"),
  classAnalysis
);

module.exports = router;
