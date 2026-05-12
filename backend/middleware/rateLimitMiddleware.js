const AppError = require("../utils/AppError");

const buckets = new Map();

const createRateLimiter = ({ windowMs, maxRequests }) => {
  return (req, res, next) => {
    const userKey = req.user?._id?.toString() || req.ip;
    const now = Date.now();
    const bucket = buckets.get(userKey);

    if (!bucket || now > bucket.resetAt) {
      buckets.set(userKey, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (bucket.count >= maxRequests) {
      return next(new AppError("Unable to generate test right now", 429, "RATE_LIMITED"));
    }

    bucket.count += 1;
    next();
  };
};

module.exports = {
  createRateLimiter,
};
