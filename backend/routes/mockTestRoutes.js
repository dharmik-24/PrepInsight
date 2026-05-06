const express = require("express");
const router = express.Router();
const mockTests = require("../data/mockTests");

router.get("/", (req, res) => {
  res.json(mockTests.map(t => ({ id: t.id, title: t.title })));
});

router.get("/:id", (req, res) => {
  const test = mockTests.find(t => t.id === Number(req.params.id));
  if (!test) return res.status(404).json({ message: "Not found" });
  res.json(test);
});

module.exports = router;
