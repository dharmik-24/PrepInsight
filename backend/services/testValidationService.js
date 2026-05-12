const { TEST_BLUEPRINT, TEST_CONSTRAINTS } = require("../constants/testBlueprint");

const normalize = (value) => String(value || "").trim().toLowerCase();

const deduplicateQuestions = (questions = []) => {
  const seen = new Set();
  const result = [];

  for (const question of questions) {
    const key = normalize(question.questionText);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(question);
  }

  return result;
};

const sanitizeQuestion = (question, subject) => {
  const type = normalize(question.type);
  const base = {
    questionText: String(question.questionText || "").trim(),
    type,
    options: Array.isArray(question.options) ? question.options.map((opt) => String(opt).trim()).filter(Boolean) : [],
    correctAnswer: question.correctAnswer,
    explanation: String(question.explanation || "").trim(),
    subject,
    topic: String(question.topic || "").trim(),
    difficulty: ["easy", "medium", "hard"].includes(normalize(question.difficulty))
      ? normalize(question.difficulty)
      : "medium",
    marks: Number(question.marks),
    negativeMarks: Number(question.negativeMarks),
  };

  if (type === "nat" && typeof base.correctAnswer === "string") {
    const numeric = Number(base.correctAnswer);
    if (Number.isFinite(numeric)) base.correctAnswer = numeric;
  }

  return base;
};

const validateQuestion = (question, index) => {
  const errors = [];
  const path = `questions[${index}]`;

  if (!question.questionText) errors.push(`${path}.questionText is required`);
  if (!question.explanation) errors.push(`${path}.explanation is required`);
  if (!question.topic) errors.push(`${path}.topic is required`);
  if (!["mcq", "msq", "nat"].includes(question.type)) errors.push(`${path}.type is invalid`);
  if (![1, 2].includes(question.marks)) errors.push(`${path}.marks must be 1 or 2`);
  if (!["easy", "medium", "hard"].includes(question.difficulty)) errors.push(`${path}.difficulty is invalid`);

  if (question.type === "mcq") {
    if (!Array.isArray(question.options) || question.options.length !== 4) {
      errors.push(`${path}.mcq must have exactly 4 options`);
    }
    if (Array.isArray(question.correctAnswer)) {
      errors.push(`${path}.mcq must have single correct answer`);
    } else if (!question.options.includes(String(question.correctAnswer))) {
      errors.push(`${path}.mcq correctAnswer must be one of options`);
    }
  }

  if (question.type === "msq") {
    if (!Array.isArray(question.options) || question.options.length !== 4) {
      errors.push(`${path}.msq must have exactly 4 options`);
    }
    if (!Array.isArray(question.correctAnswer) || question.correctAnswer.length < 2) {
      errors.push(`${path}.msq must have multiple correct answers`);
    } else if (question.correctAnswer.some((ans) => !question.options.includes(String(ans)))) {
      errors.push(`${path}.msq correct answers must exist in options`);
    }
  }

  if (question.type === "nat") {
    if (Array.isArray(question.options) && question.options.length > 0) {
      errors.push(`${path}.nat must not contain options`);
    }
    if (!Number.isFinite(Number(question.correctAnswer))) {
      errors.push(`${path}.nat correctAnswer must be numeric`);
    }
  }

  return errors;
};

const validateBlueprintDistribution = (questions) => {
  const errors = [];
  for (const slot of TEST_BLUEPRINT) {
    const count = questions.filter((q) => q.type === slot.type && q.marks === slot.marks).length;
    if (count !== slot.count) {
      errors.push(
        `Expected ${slot.count} questions for ${slot.type.toUpperCase()} ${slot.marks}-mark, found ${count}`
      );
    }
  }
  return errors;
};

const sanitizeAndValidateGeneratedTest = ({ payload, subject }) => {
  const errors = [];
  if (!payload || typeof payload !== "object") {
    return { isValid: false, errors: ["Payload must be a JSON object"], questions: [] };
  }

  if (!Array.isArray(payload.questions)) {
    return { isValid: false, errors: ["Questions array must exist"], questions: [] };
  }

  const sanitizedQuestions = deduplicateQuestions(payload.questions.map((q) => sanitizeQuestion(q, subject)));

  sanitizedQuestions.forEach((question, index) => {
    errors.push(...validateQuestion(question, index));
  });

  if (sanitizedQuestions.length !== TEST_CONSTRAINTS.totalQuestions) {
    errors.push(`Exact question count required: ${TEST_CONSTRAINTS.totalQuestions}`);
  }

  errors.push(...validateBlueprintDistribution(sanitizedQuestions));

  return {
    isValid: errors.length === 0,
    errors,
    questions: sanitizedQuestions,
  };
};

module.exports = {
  sanitizeAndValidateGeneratedTest,
};
