const gateSyllabus = require('./backend/data/gateSyllabus.js');
const questionBank = require('./backend/data/questionBank.js');
const mockTests = require('./backend/data/mockTests.js');

const syllabusSubjects = new Set(Object.keys(gateSyllabus));
const qbSubjects = new Set(questionBank.map(q => q.subject));

const mtSubjects = new Set();
mockTests.forEach(test => {
  test.sections.forEach(section => {
    section.questions.forEach(q => {
      if (q.subject) mtSubjects.add(q.subject);
    });
  });
});

console.log('Syllabus Subjects:', Array.from(syllabusSubjects));
console.log('Question Bank Subjects missing in Syllabus:');
qbSubjects.forEach(sub => {
  if (!syllabusSubjects.has(sub)) console.log(`- ${sub}`);
});

console.log('Mock Tests Subjects missing in Syllabus:');
mtSubjects.forEach(sub => {
  if (!syllabusSubjects.has(sub)) console.log(`- ${sub}`);
});
