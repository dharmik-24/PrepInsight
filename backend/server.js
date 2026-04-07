const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth',      require('./routes/authRoutes'));
app.use('/api/studylogs', require('./routes/studyLogRoutes'));
app.use('/api/topics',    require('./routes/topicRoutes'));
app.use('/api/tests',     require('./routes/testRoutes'));
app.use('/api/results',   require('./routes/resultRoutes'));
app.use('/api/mistakes',  require('./routes/mistakeRoutes'));

// Health check
app.get('/', (req, res) => res.json({ message: 'PrepInsight API Running 🚀' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));