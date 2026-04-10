const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { addLog, getLogs, getStats, deleteLog, getSyllabus } = require('../controllers/studyLogController');
=======
const { addLog, getLogs, getStats, deleteLog } = require('../controllers/studyLogController');
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All routes protected

router.route('/').get(getLogs).post(addLog);
router.get('/stats', getStats);
<<<<<<< HEAD
router.get('/syllabus', getSyllabus);
=======
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
router.delete('/:id', deleteLog);

module.exports = router;