const AppError = require("../utils/AppError");

const sanitizeAiJson = (rawText) => {
  if (!rawText || typeof rawText !== "string") {
    throw new AppError("AI returned invalid response", 502, "INVALID_AI_RESPONSE");
  }

  let content = rawText.trim();

  if (content.startsWith("```")) {
    content = content.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  }

  const firstBrace = content.indexOf("{");
  const lastBrace = content.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new AppError("AI returned invalid response", 502, "INVALID_JSON_ENVELOPE");
  }

  content = content.slice(firstBrace, lastBrace + 1);
  return content;
};

const parseAiJson = (rawText) => {
  const cleanText = sanitizeAiJson(rawText);
  try {
    return JSON.parse(cleanText);
  } catch (error) {
    throw new AppError("AI returned invalid response", 502, "UNPARSABLE_JSON");
  }
};

module.exports = {
  sanitizeAiJson,
  parseAiJson,
};
