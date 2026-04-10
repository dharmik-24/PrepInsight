const express = require('express');
const router = express.Router();
const { addLog, getLogs, getStats, deleteLog, getSyllabus } = require('../controllers/studyLogController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All routes protected

router.route('/').get(getLogs).post(addLog);
router.get('/stats', getStats);
router.get('/syllabus', getSyllabus);
router.delete('/:id', deleteLog);

module.exports = router;