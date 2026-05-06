const express = require('express');
const router = express.Router();
const { submitTest, getResults, getRankPrediction } = require('../controllers/resultController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.post('/submit', submitTest);
router.get('/', getResults);
router.get('/rank-prediction', getRankPrediction);

module.exports = router;