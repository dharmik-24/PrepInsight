const express = require('express');
const router = express.Router();
const { addLog, getLogs, getStats, deleteLog } = require('../controllers/studyLogController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All routes protected

router.route('/').get(getLogs).post(addLog);
router.get('/stats', getStats);
router.delete('/:id', deleteLog);

module.exports = router;