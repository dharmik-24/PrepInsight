const express = require("express");
const router = express.Router();
const Test = require("../models/Test");

router.get("/", async (req, res) => {
  try {
    const tests = await Test.find({ testType: 'full-mock' }, 'title _id');
    res.json(tests.map(t => ({ id: t._id, title: t.title })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Not found" });
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
