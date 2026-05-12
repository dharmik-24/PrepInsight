const { TEST_BLUEPRINT, TEST_CONSTRAINTS } = require("../constants/testBlueprint");

const buildGenerationPrompt = ({ subject, topics }) => {
  const distributionText = TEST_BLUEPRINT.map(
    (slot) => `- ${slot.count} ${slot.type.toUpperCase()} of ${slot.marks} mark each (negativeMarks: ${slot.negativeMarks})`
  ).join("\n");

  return `
You are generating a high-quality GATE-level subject-wise test.

Return ONLY valid JSON. Do not include markdown, code fences, or extra text.
The response must follow this exact schema:
{
  "questions": [
    {
      "questionText": "string",
      "type": "mcq|msq|nat",
      "options": ["string"], 
      "correctAnswer": "string|number|array",
      "explanation": "string",
      "subject": "string",
      "topic": "string",
      "difficulty": "easy|medium|hard",
      "marks": 1|2,
      "negativeMarks": 0|0.33|0.67
    }
  ]
}

Generate a test for subject: ${subject}
Topics to cover (balanced coverage): ${topics.join(", ")}

Strict blueprint:
${distributionText}
Total questions: ${TEST_CONSTRAINTS.totalQuestions}
Total marks: ${TEST_CONSTRAINTS.totalMarks}
Duration is fixed at ${TEST_CONSTRAINTS.durationMinutes} minutes.

Rules:
1) MCQ must have exactly 4 options and exactly one correct answer from options.
2) MSQ must have exactly 4 options and at least 2 correct answers from options.
3) NAT must have empty options array and numeric correctAnswer only.
4) No duplicate or near-duplicate questions.
5) Ensure explanations are concise and meaningful.
6) Keep all questions strictly relevant to ${subject}.
7) Keep question quality at GATE exam standard.
8) Preserve marks and negative marking exactly as required.
9) Return exactly ${TEST_CONSTRAINTS.totalQuestions} questions.
`.trim();
};

const buildCorrectivePrompt = ({ subject, originalPrompt, validationErrors }) => {
  return `
The previous response was invalid.
Fix it and return ONLY valid JSON (no markdown, no code fence).
Subject: ${subject}

Validation errors:
${validationErrors.map((error, index) => `${index + 1}. ${error}`).join("\n")}

Follow the original instructions exactly:
${originalPrompt}
`.trim();
};

module.exports = {
  buildGenerationPrompt,
  buildCorrectivePrompt,
};
