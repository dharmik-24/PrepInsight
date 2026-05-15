const fs = require('fs');

const files = ['./backend/data/mockTests.js', './backend/data/questionBank.js', './frontend/src/pages/StudyLog.jsx'];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  content = content.replace(/"Discrete Maths"/g, '"Discrete Mathematics"');
  content = content.replace(/'Discrete Maths'/g, "'Discrete Mathematics'");
  
  content = content.replace(/"Mathematics"/g, '"Engineering Mathematics"');
  content = content.replace(/'Mathematics'/g, "'Engineering Mathematics'");
  
  // carefully replace EXACT "C" to "C Programming"
  content = content.replace(/subject: "C"/g, 'subject: "C Programming"');
  content = content.replace(/subject: 'C'/g, "subject: 'C Programming'");
  // StudyLog.jsx fallback array replace
  content = content.replace(/'C', 'Discrete Mathematics'/g, "'C Programming', 'Discrete Mathematics'");
  content = content.replace(/'Compiler Design', 'C'/g, "'Compiler Design', 'C Programming'");
  
  content = content.replace(/"Theory of Computation"/g, '"TOC"');
  content = content.replace(/'Theory of Computation'/g, "'TOC'");
  
  content = content.replace(/"Computer Organization"/g, '"COA"');
  content = content.replace(/'Computer Organization'/g, "'COA'");
  
  content = content.replace(/"Compiler"/g, '"Compiler Design"');
  content = content.replace(/'Compiler'/g, "'Compiler Design'");
  
  fs.writeFileSync(f, content);
  console.log('Updated ' + f);
});
