const express = require('express');
const router = express.Router();
const { seedTests, getTests, getTestById } = require('../controllers/testController');
const { protect } = require('../middleware/authMiddleware');

router.get('/seed', seedTests);   // Run once to populate DB
router.use(protect);
router.get('/', getTests);
router.get('/:id', getTestById);

module.exports = router;