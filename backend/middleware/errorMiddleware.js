const AppError = require("../utils/AppError");
const logger = require("../utils/logger");

const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404, "NOT_FOUND"));
};

const errorHandler = (err, req, res, next) => {
  const normalizedError =
    err instanceof AppError
      ? err
      : new AppError(err.message || "Unexpected server error", err.statusCode || 500);

  logger.error("Request failed", {
    path: req.originalUrl,
    method: req.method,
    statusCode: normalizedError.statusCode,
    code: normalizedError.code,
    details: normalizedError.details,
  });

  res.status(normalizedError.statusCode).json({
    message: normalizedError.message,
    code: normalizedError.code,
    details: normalizedError.details,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
