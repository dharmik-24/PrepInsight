const express = require('express');
const router = express.Router();
const { seedTests, getSubjects, generateTest, getTests, getTestById } = require('../controllers/testController');
const { protect } = require('../middleware/authMiddleware');
const { validateGenerateTestRequest } = require('../middleware/validateGenerateTestRequest');
const { createRateLimiter } = require('../middleware/rateLimitMiddleware');

router.get('/seed', seedTests);   // Run once to populate DB
router.use(protect);
router.get('/subjects', getSubjects);
router.post(
  '/generate',
  createRateLimiter({ windowMs: 60 * 1000, maxRequests: 5 }),
  validateGenerateTestRequest,
  generateTest
);
router.get('/', getTests);
router.get('/:id', getTestById);

module.exports = router;