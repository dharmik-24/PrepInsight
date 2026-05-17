const { GoogleGenerativeAI } = require("@google/generative-ai");
const AppError = require("../utils/AppError");
const logger = require("../utils/logger");

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS || 30000);

let model;

const getModel = () => {
  if (model) return model;

  if (!process.env.GEMINI_API_KEY) {
    throw new AppError("Gemini API key is missing in environment", 500, "MISSING_GEMINI_KEY");
  }

  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = client.getGenerativeModel({ 
    model: MODEL_NAME,
    generationConfig: { responseMimeType: "application/json" }
  });
  return model;
};

const withTimeout = (promise, timeoutMs) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new AppError("Generation timeout", 504, "GENERATION_TIMEOUT")), timeoutMs)
    ),
  ]);
};

const mapGeminiError = (error) => {
  const message = String(error?.message || "Unknown Gemini error");
  if (message.includes("429") || message.toLowerCase().includes("rate")) {
    return new AppError("Unable to generate test right now", 429, "GEMINI_RATE_LIMIT");
  }
  if (message.includes("token") || message.toLowerCase().includes("max output")) {
    return new AppError("Unable to generate test right now", 503, "GEMINI_TOKEN_LIMIT");
  }
  if (error instanceof AppError) return error;
  return new AppError("Unable to generate test right now", 502, "GEMINI_FAILURE");
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateText = async (prompt, maxRetries = 3) => {
  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      const activeModel = getModel();
      const response = await withTimeout(activeModel.generateContent(prompt), TIMEOUT_MS);
      const text = response?.response?.text?.();

      if (!text || !text.trim()) {
        throw new AppError("Unable to generate test right now", 502, "EMPTY_AI_RESPONSE");
      }

      return text.trim();
    } catch (error) {
      const mappedError = mapGeminiError(error);
      
      if ((mappedError.code === "GEMINI_RATE_LIMIT" || mappedError.code === "GENERATION_TIMEOUT") && attempt < maxRetries) {
        attempt++;
        const delay = Math.min(1000 * Math.pow(2, attempt) + Math.random() * 1000, 10000); // Exponential backoff with jitter
        const reason = mappedError.code === "GEMINI_RATE_LIMIT" ? "rate limited" : "timed out";
        logger.warn(`Gemini ${reason}. Retrying in ${Math.round(delay)}ms... (Attempt ${attempt}/${maxRetries})`);
        await sleep(delay);
        continue;
      }
      
      throw mappedError;
    }
  }
};

module.exports = {
  generateText,
};
