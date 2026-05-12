const TEST_BLUEPRINT = [
  { type: "mcq", marks: 1, count: 2, negativeMarks: 0.33, difficulties: ["easy", "medium"] },
  { type: "mcq", marks: 2, count: 4, negativeMarks: 0.67, difficulties: ["medium", "hard"] },
  { type: "msq", marks: 1, count: 2, negativeMarks: 0, difficulties: ["easy", "medium"] },
  { type: "msq", marks: 2, count: 3, negativeMarks: 0, difficulties: ["medium", "hard"] },
  { type: "nat", marks: 1, count: 1, negativeMarks: 0, difficulties: ["easy", "medium"] },
  { type: "nat", marks: 2, count: 3, negativeMarks: 0, difficulties: ["medium", "hard"] },
];

const TEST_CONSTRAINTS = {
  totalQuestions: TEST_BLUEPRINT.reduce((sum, slot) => sum + slot.count, 0),
  durationMinutes: 45,
  totalMarks: TEST_BLUEPRINT.reduce((sum, slot) => sum + slot.count * slot.marks, 0),
};

module.exports = {
  TEST_BLUEPRINT,
  TEST_CONSTRAINTS,
};
