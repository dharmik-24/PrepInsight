const express = require('express');
const router = express.Router();
const { getMistakes, markRevised, bookmarkQuestion } = require('../controllers/mistakeController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getMistakes);
router.put('/:id/revise', markRevised);
router.post('/bookmark', bookmarkQuestion);

module.exports = router;