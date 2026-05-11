const Test = require("../models/Test");
const GATE_SYLLABUS = require("../data/gateSyllabus");
const { TEST_CONSTRAINTS } = require("../constants/testBlueprint");
const { buildGenerationPrompt, buildCorrectivePrompt } = require("./aiPromptService");
const { parseAiJson } = require("./aiResponseService");
const { sanitizeAndValidateGeneratedTest } = require("./testValidationService");
const { generateText } = require("./geminiService");
const AppError = require("../utils/AppError");
const logger = require("../utils/logger");

const CACHE_TTL_MS = Number(process.env.AI_TEST_CACHE_TTL_MS || 10 * 60 * 1000);
const generationCache = new Map();

const getCacheKey = (subject) => subject.toLowerCase();

const getCachedTest = (subject) => {
  const entry = generationCache.get(getCacheKey(subject));
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    generationCache.delete(getCacheKey(subject));
    return null;
  }
  return entry.data;
};

const setCachedTest = (subject, data) => {
  generationCache.set(getCacheKey(subject), {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
};

const createTestDocument = async ({ subject, questions }) => {
  return Test.create({
    title: `${subject} - Subject-wise Test`,
    testType: "topic-wise",
    subject,
    duration: TEST_CONSTRAINTS.durationMinutes,
    questions,
    totalMarks: TEST_CONSTRAINTS.totalMarks,
  });
};

const generateSubjectWiseTest = async ({ subject }) => {
  const cached = getCachedTest(subject);
  if (cached) {
    logger.info("Serving AI test from cache", { subject });
    return { test: cached, cached: true };
  }

  const topics = GATE_SYLLABUS[subject] || [];
  const initialPrompt = buildGenerationPrompt({ subject, topics });

  let prompt = initialPrompt;
  let lastErrors = [];

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    logger.info("Generating subject-wise test with AI", { subject, attempt });
    const rawText = await generateText(prompt);
    
    let parsed;
    try {
      parsed = parseAiJson(rawText);
    } catch (parseError) {
      logger.warn("AI returned invalid JSON", { subject, attempt, error: parseError.message });
      prompt = buildCorrectivePrompt({
        subject,
        originalPrompt: initialPrompt,
        validationErrors: [`Response was not valid JSON: ${parseError.message}`],
      });
      continue;
    }

    const validated = sanitizeAndValidateGeneratedTest({ payload: parsed, subject });

    if (validated.isValid) {
      const test = await createTestDocument({ subject, questions: validated.questions });
      setCachedTest(subject, test);
      return { test, cached: false };
    }

    lastErrors = validated.errors;
    logger.warn("AI validation failed for generated test", {
      subject,
      attempt,
      errors: validated.errors,
    });

    prompt = buildCorrectivePrompt({
      subject,
      originalPrompt: initialPrompt,
      validationErrors: validated.errors,
    });
  }

  throw new AppError("Question validation failed", 502, "QUESTION_VALIDATION_FAILED", lastErrors);
};

module.exports = {
  generateSubjectWiseTest,
};
