const mongoose = require('mongoose');
require('dotenv').config();

const Topic = require('./backend/models/Topic');
const StudyLog = require('./backend/models/StudyLog');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/prepinsight', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to DB');

  const updates = [
    { old: 'C', new: 'C Programming' },
    { old: 'Discrete Maths', new: 'Discrete Mathematics' },
    { old: 'Mathematics', new: 'Engineering Mathematics' },
    { old: 'Theory of Computation', new: 'TOC' },
    { old: 'Computer Organization', new: 'COA' },
    { old: 'Compiler', new: 'Compiler Design' }
  ];

  for (const { old: oldSub, new: newSub } of updates) {
    const topicRes = await Topic.updateMany({ subject: oldSub }, { $set: { subject: newSub } });
    const logRes = await StudyLog.updateMany({ subject: oldSub }, { $set: { subject: newSub } });
    console.log(`Updated ${oldSub} -> ${newSub}. Topics: ${topicRes.modifiedCount}, Logs: ${logRes.modifiedCount}`);
  }

  mongoose.connection.close();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
