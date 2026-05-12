const GATE_SYLLABUS = require("../data/gateSyllabus");
const AppError = require("../utils/AppError");

const validateGenerateTestRequest = (req, res, next) => {
  const subject = typeof req.body.subject === "string" ? req.body.subject.trim() : "";

  if (!subject) {
    return next(new AppError("Subject is required", 400, "INVALID_INPUT"));
  }

  if (!Object.prototype.hasOwnProperty.call(GATE_SYLLABUS, subject)) {
    return next(new AppError("Invalid subject selected", 400, "INVALID_SUBJECT"));
  }

  req.body.subject = subject;
  next();
};

module.exports = {
  validateGenerateTestRequest,
};
