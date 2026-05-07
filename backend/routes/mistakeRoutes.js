const express = require('express');

const router = express.Router();

const {
  getMistakes,
  markRevised,
  bookmarkQuestion,
  updateNote,
  deleteNote
} = require('../controllers/mistakeController');

const { protect } = require('../middleware/authMiddleware');

// ✅ Protect all routes
router.use(protect);

// ✅ Get all mistakes
router.get('/', getMistakes);

// ✅ Bookmark question
router.post('/bookmark', bookmarkQuestion);

// ✅ Mark mistake as revised
router.put('/:id/revise', markRevised);

// ✅ Save / Update note
router.put('/:id/note', updateNote);

// ✅ Delete note
router.delete('/:id/note', deleteNote);

module.exports = router;