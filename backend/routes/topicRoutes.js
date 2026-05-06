const express = require('express');
const router = express.Router();
const { initializeTopics, getTopics, updateTopic, getRevisionPlan } = require('../controllers/topicController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/init', initializeTopics);
router.get('/', getTopics);
router.put('/:id', updateTopic);
router.get('/revision-plan', getRevisionPlan);

module.exports = router;