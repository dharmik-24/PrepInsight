const Mistake = require('../models/Mistake');

// ==============================
// GET ALL MISTAKES
// ==============================
const getMistakes = async (req, res) => {
  try {

    const filter = {
      user: req.user._id
    };

    // Filter by subject
    if (req.query.subject) {
      filter.subject = req.query.subject;
    }

    // Show only unrevised
    if (req.query.revised === 'false') {
      filter.isRevised = false;
    }

    const mistakes = await Mistake.find(filter).sort({
      createdAt: -1
    });

    res.json(mistakes);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// ==============================
// TOGGLE REVISED / UNREVISED
// ==============================
const markRevised = async (req, res) => {
  try {

    const mistake = await Mistake.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!mistake) {

      return res.status(404).json({
        message: 'Mistake not found'
      });

    }

    // Toggle status
    mistake.isRevised = !mistake.isRevised;

    await mistake.save();

    res.json({
      success: true,
      isRevised: mistake.isRevised,
      message: mistake.isRevised
        ? 'Marked as revised'
        : 'Marked as unrevised',
      mistake
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// ==============================
// SAVE / UPDATE NOTE
// ==============================
const updateNote = async (req, res) => {
  try {

    const { note } = req.body;

    const mistake = await Mistake.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!mistake) {

      return res.status(404).json({
        message: 'Mistake not found'
      });

    }

    // Save note
    mistake.note = note;

    await mistake.save();

    res.json({
      success: true,
      message: 'Note saved successfully',
      note: mistake.note,
      mistake
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// ==============================
// DELETE NOTE
// ==============================
const deleteNote = async (req, res) => {
  try {

    const mistake = await Mistake.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!mistake) {

      return res.status(404).json({
        message: 'Mistake not found'
      });

    }

    // Clear note
    mistake.note = '';

    await mistake.save();

    res.json({
      success: true,
      message: 'Note deleted successfully',
      mistake
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// ==============================
// BOOKMARK QUESTION
// ==============================
const bookmarkQuestion = async (req, res) => {
  try {

    const User = require('../models/User');

    const { questionId } = req.body;

    const user = await User.findById(req.user._id);

    if (!user.bookmarks.includes(questionId)) {

      user.bookmarks.push(questionId);

      await user.save();

    }

    res.json({
      bookmarks: user.bookmarks
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  getMistakes,
  markRevised,
  updateNote,
  deleteNote,
  bookmarkQuestion
};