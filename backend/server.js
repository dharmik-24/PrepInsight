const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./config/db');
const doubtRoutes = require('./routes/doubtRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load env variables
// dotenv.config();




// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust this to specific frontend URL in production
    methods: ['GET', 'POST']
  }
});
require('./socket/socketHandler')(io);

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
app.use('/api/mock-tests', require('./routes/mockTestRoutes'));
app.use('/api/materials',  require('./routes/materialRoutes'));
<<<<<<< HEAD
app.use('/api/doubts', doubtRoutes);
=======
app.use('/api/upload',     require('./routes/uploadRoutes'));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Groups Route (using jsonUtils)
const { readJson } = require('./utils/jsonUtils');
app.get('/api/groups', async (req, res) => {
  try {
    const groups = await readJson(path.join(__dirname, 'data/groups.json'), []);
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load groups' });
  }
});
>>>>>>> 30a572f00109740b802c46d0b1a7f22e58ad0e29

// Health check
app.get('/', (req, res) => res.json({ message: 'PrepInsight API Running 🚀' }));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));