const Mistake = require('../models/Mistake');

const getMistakes = async (req, res) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.revised === 'false') filter.isRevised = false;

    const mistakes = await Mistake.find(filter).sort({ createdAt: -1 });
    res.json(mistakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markRevised = async (req, res) => {
  try {
    const mistake = await Mistake.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isRevised: true },
      { new: true }
    );
    if (!mistake) return res.status(404).json({ message: 'Not found' });
    res.json(mistake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bookmarkQuestion = async (req, res) => {
  try {
    const User = require('../models/User');
    const { questionId } = req.body;
    const user = await User.findById(req.user._id);
    if (!user.bookmarks.includes(questionId)) {
      user.bookmarks.push(questionId);
      await user.save();
    }
    res.json({ bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMistakes, markRevised, bookmarkQuestion };