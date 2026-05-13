# PrepInsight - Codebase Summary

## 📋 Project Overview

**PrepInsight** is a comprehensive GATE (Graduate Aptitude Test for Engineering) exam preparation platform designed to help students prepare efficiently through AI-powered features, intelligent testing, and personalized study management.

The application combines a **React-based frontend** with a **Node.js/Express backend**, featuring real-time communication via WebSockets and AI-driven doubt solving through Google Gemini API.

---

## 🎯 Key Features

### 1. **User Authentication & Profile Management**
- User registration and login with JWT token-based authentication
- Password hashing using bcryptjs
- User profile management with daily study goal tracking
- Theme preference (light/dark mode)
- Bookmark functionality for important questions

### 2. **Test Generation & Management**
- **Subject-wise Tests**: AI-powered test generation using Google Gemini API
- **Mock Tests**: Full-length GATE mock tests based on official patterns
- **Test Types Supported**:
  - MCQ (Single Correct Answer)
  - MSQ (Multiple Correct Answers)
  - NAT (Numerical Answer Type)
- Dynamic question generation from GATE question bank
- Test caching for optimized performance (10-minute TTL)
- Comprehensive test validation and error handling

### 3. **Test Engine & Result Analysis**
- Interactive test interface with real-time timer
- Automatic test submission and result calculation
- GATE-style marking scheme:
  - Positive marks for correct answers
  - Negative marking for incorrect MCQ/MSQ attempts
  - NAT questions (no negative marking)
- Result analytics including:
  - Overall score and accuracy percentage
  - Subject-wise performance breakdown
  - Weak topics identification
  - Time analysis per question

### 4. **Mistake Book & Revision Planning**
- Automatic capture of incorrect answers during tests
- Mistake tracking with:
  - Original question and options
  - User's answer vs correct answer
  - Explanation for each mistake
  - Subject and topic categorization
- Mark mistakes as revised/unrevised for tracking progress
- Filter mistakes by subject
- **Intelligent Revision Planner** using:
  - Spaced repetition algorithms
  - Topic status (pending/in-progress/completed)
  - Accuracy scores and revision counts
  - Subject importance weighting
  - Due date calculation

### 5. **Study Log & Progress Tracking**
- Log daily study sessions with:
  - Subject and topic information
  - Duration (in minutes)
  - Custom notes
  - Date tracking
- Study statistics dashboard showing:
  - Total study hours
  - Subject-wise breakdown
  - Daily heatmap visualization (last 90 days)
- Topic progress tracking with:
  - Status management (pending/in-progress/completed)
  - Last studied date
  - Revision count
  - Accuracy tracking
  - Total attempts and correct attempts

### 6. **AI-Powered Doubt Solver**
- Real-time doubt resolution using Google Gemini API
- **Text-based questions**: Direct question answering
- **Image-based questions**: 
  - Upload question images/screenshots
  - Combined image and text analysis
  - Automatic image cleanup after processing
- Clear and concise explanations
- Mathematical expression support

### 7. **Collaborative Features**
- **Group Chat System** with real-time communication:
  - Create and join study groups
  - Real-time messaging via WebSockets (Socket.io)
  - Image/file sharing in group discussions
  - Message persistence (JSON-based storage)
  - Member tracking and active user management
  - Group member list with real-time updates

### 8. **Study Materials Management**
- Upload custom study materials
- Material sharing within platform
- File management with Cloudinary integration
- Material categorization by subject/topic

### 9. **Dashboard & Analytics**
- Comprehensive dashboard with:
  - Study hour statistics chart
  - Topic completion progress
  - Recent test results display
  - Visual heatmap of study consistency
  - Quick access to recent activity
  - Performance trends

### 10. **Topic Management**
- Automatic topic synchronization with GATE syllabus
- Topic-level tracking:
  - Status management
  - Custom notes per topic
  - Last studied timestamp
  - Revision frequency
  - Accuracy metrics
  - Attempt tracking
- GATE Syllabus Integration:
  - Data Structures, Algorithms
  - Operating Systems, DBMS
  - Computer Networks, TOC
  - Compiler Design, Digital Logic
  - Mathematics, General Aptitude

---

## 🛠️ Technology Stack

### **Backend (Node.js/Express)**
```json
{
  "runtime": "Node.js",
  "framework": "Express.js 4.18.2",
  "database": "MongoDB 7.3.1 (Mongoose ODM)",
  "authentication": "JWT (jsonwebtoken 9.0.0)",
  "security": "bcryptjs 2.4.3, CORS",
  "ai_integration": "@google/generative-ai 0.24.1",
  "real_time": "Socket.io 4.8.3",
  "file_upload": "Multer 2.1.1, Cloudinary 2.10.0",
  "dev_tools": "nodemon 3.0.1",
  "environment": "dotenv"
}
```

### **Frontend (React + Vite)**
```json
{
  "framework": "React 18.2.0",
  "bundler": "Vite 7.3.1",
  "routing": "React Router DOM 6.14.0",
  "http_client": "Axios 1.4.0",
  "real_time": "Socket.io-client 4.8.3",
  "visualization": "Chart.js 4.3.0, react-chartjs-2 5.2.0",
  "markdown": "react-markdown 10.1.0, remark-gfm 4.0.1, remark-math 6.0.0",
  "math_rendering": "KaTeX 0.16.45, rehype-katex 7.0.1",
  "build": "Vite plugin for React"
}
```

### **Database Schema**
- **MongoDB** with Mongoose ODM
- Collections: Users, Tests, Results, Mistakes, StudyLogs, Topics

---

## 📊 Architecture

### **Backend Architecture**

```
backend/
├── server.js                          # Main Express server with Socket.io setup
├── config/
│   └── db.js                          # MongoDB connection
├── models/                            # Mongoose schemas
│   ├── User.js                        # User authentication & profile
│   ├── Test.js                        # Test structure & questions
│   ├── Result.js                      # Test results & analysis
│   ├── Mistake.js                     # Mistake book entries
│   ├── StudyLog.js                    # Study session logs
│   └── Topic.js                       # Topic progress tracking
├── controllers/                       # Route handlers
│   ├── authController.js              # Register, login, profile
│   ├── testController.js              # Test creation & retrieval
│   ├── resultController.js            # Result submission & analysis
│   ├── mistakeController.js           # Mistake book management
│   ├── studyLogController.js          # Study log operations
│   ├── topicController.js             # Topic management
│   ├── doubtController.js             # AI doubt solving
├── routes/                            # API endpoints
├── services/                          # Business logic
│   ├── geminiService.js               # Google Gemini API integration
│   ├── testGenerationService.js       # AI test generation with retry logic
│   ├── testValidationService.js       # Test validation
│   ├── aiPromptService.js             # AI prompt construction
│   └── aiResponseService.js           # AI response parsing
├── middleware/
│   ├── authMiddleware.js              # JWT verification
│   ├── errorMiddleware.js             # Global error handling
│   └── rateLimitMiddleware.js         # Rate limiting
├── utils/
│   ├── revisionPlanner.js             # Spaced repetition algorithm
│   ├── logger.js                      # Logging utility
│   └── AppError.js                    # Custom error class
├── socket/
│   └── socketHandler.js               # Real-time chat & notifications
├── data/
│   ├── gateSyllabus.js                # GATE syllabus structure
│   ├── questionBank.js                # Question database
│   ├── mockTests.js                   # Mock test data
│   ├── groups.json                    # Study groups
│   └── messages/                      # Chat message storage
├── constants/
│   └── testBlueprint.js               # Test configuration & constraints
└── uploads/                           # File storage for uploads
```

### **Frontend Architecture**

```
frontend/
├── src/
│   ├── App.jsx                        # Main router configuration
│   ├── main.jsx                       # React entry point
│   ├── index.css                      # Global styles
│   ├── api/
│   │   └── axios.js                   # Axios instance with auth
│   ├── context/
│   │   └── AuthContext.jsx            # Global authentication state
│   ├── components/                    # Reusable components
│   │   ├── Navbar.jsx                 # Navigation bar
│   │   ├── PrivateRoute.jsx           # Route protection
│   │   ├── Heatmap.jsx                # Study heatmap visualization
│   │   ├── QuestionReviewCard.jsx     # Question display
│   │   └── Loader.jsx                 # Loading indicator
│   └── pages/                         # Page components
│       ├── Login.jsx                  # User authentication
│       ├── Register.jsx               # User registration
│       ├── Dashboard.jsx              # Main dashboard
│       ├── Tests.jsx                  # Subject-wise tests
│       ├── TestSelection.jsx          # Test selection interface
│       ├── TestEngine.jsx             # Interactive test interface
│       ├── ResultPage.jsx             # Result display & analysis
│       ├── Analysis.jsx               # Performance analytics
│       ├── MockTests.jsx              # Mock test listing
│       ├── MockTestAttempt.jsx        # Mock test attempt
│       ├── MistakeBook.jsx            # Mistake review
│       ├── StudyLog.jsx               # Study logging
│       ├── Topics.jsx                 # Topic management
│       ├── DoubtSolver.jsx            # AI doubt solving
│       ├── GroupChat.jsx              # Group chat interface
│       ├── GroupList.jsx              # Study groups listing
│       ├── AddMaterial.jsx            # Material upload
│       ├── InfoSharing.jsx            # Resource sharing
│       ├── WelcomeSplash.jsx          # Welcome screen
│       └── Profile.jsx                # User profile
└── vite.config.js                     # Vite configuration
```

---

## 🔄 API Endpoints & Workflow

### **Authentication Flow**
```
POST /api/auth/register      → Register new user
POST /api/auth/login         → Login user
GET  /api/auth/me            → Get current user
PUT  /api/auth/profile       → Update user profile
```

### **Test Management Flow**
```
GET  /api/tests              → Get all tests
GET  /api/tests/:id          → Get test details
POST /api/tests/generate     → Generate AI test
GET  /api/mock-tests         → Get mock tests
POST /api/results            → Submit test & calculate results
GET  /api/results            → Get user results
```

### **Study Tracking Flow**
```
POST /api/studylogs          → Log study session
GET  /api/studylogs          → Get study logs
GET  /api/studylogs/stats    → Get study statistics & heatmap
GET  /api/topics             → Get topic progress
PUT  /api/topics/:id         → Update topic status
```

### **Mistake Management Flow**
```
GET  /api/mistakes           → Get all mistakes (filterable)
GET  /api/mistakes/:id       → Get mistake details
PUT  /api/mistakes/:id       → Mark as revised/unrevised
DELETE /api/mistakes/:id     → Delete mistake entry
```

### **AI Services Flow**
```
POST /api/doubts             → Ask doubt (text or image)
POST /api/tests/generate     → Generate AI-powered tests
```

### **Real-time Communication (WebSocket)**
```
joinGroup        → Join study group chat
sendMessage      → Send message in group
loadMessages     → Load message history
newMessage       → Receive new message
groupUpdated     → Receive group updates
leaveGroup       → Leave group
```

---

## 🧠 Key Algorithms & Services

### **1. Test Generation Service**
- **Purpose**: Generate GATE-compliant tests using AI
- **Process**:
  - Constructs detailed prompts for Gemini API
  - Handles retry logic with exponential backoff (rate limit handling)
  - Validates generated questions for GATE compliance
  - Implements caching (10-minute TTL) to reduce API calls
  - Fallback question generation if AI generation fails
  - Subject-wise and topic-balanced question distribution

### **2. Revision Planner Algorithm**
- **Purpose**: Intelligently prioritize topics for revision
- **Factors Considered**:
  - **Status Score** (24% weight): pending > in-progress > completed
  - **Recency** (20% weight): Last studied date
  - **Weakness** (28% weight): Accuracy on previous attempts
  - **Subject Importance** (10% weight): Subject difficulty weighting
  - **Due Date** (18% weight): Time since last revision
  - **Interaction** (8% weight): Recent activity
- **Output**: Top 10 recommended topics for revision
- **Normalization**: Uses percentile ranking for fair weighting across metrics

### **3. Test Validation Service**
- Ensures generated tests meet GATE standards
- Validates question count, marks distribution
- Checks answer correctness and explanation quality
- Applies corrective AI prompts for invalid tests

### **4. Mistake Book System**
- Captures errors during test submissions
- Tracks question details, user answer, correct answer, and explanation
- Supports filtering by subject and revision status
- Enables marking as revised for SRS (Spaced Repetition System)

### **5. Result Calculation Engine**
- Implements GATE marking scheme:
  - MCQ/MSQ: Marks for correct, negative marking for wrong attempts
  - NAT: Marks for correct, zero for wrong (no negative)
- Calculates accuracy percentage
- Identifies weak topics for targeted revision
- Tracks subject-wise performance
- Records time per question

---

## 📈 Data Models

### **User Model**
```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  dailyGoal: Number (default: 4 hours),
  bookmarks: [String],
  theme: String (light/dark),
  createdAt: Date
}
```

### **Test Model**
```javascript
{
  title: String,
  testType: String (topic-wise/full-mock),
  subject: String,
  topic: String,
  duration: Number (minutes),
  questions: [{
    questionText: String,
    type: String (mcq/msq/nat),
    options: [String],
    correctAnswer: Mixed,
    explanation: String,
    subject: String,
    topic: String,
    difficulty: String,
    marks: Number,
    negativeMarks: Number
  }],
  totalMarks: Number,
  createdAt: Date
}
```

### **Result Model**
```javascript
{
  user: ObjectId (ref: User),
  test: ObjectId (ref: Test),
  responses: [{
    questionId: ObjectId,
    userAnswer: Mixed,
    isCorrect: Boolean,
    timeTaken: Number (seconds)
  }],
  score: Number,
  totalMarks: Number,
  accuracy: Number (percentage),
  timeTaken: Number (seconds),
  subjectWiseScore: Map<String, Number>,
  weakTopics: [String],
  completedAt: Date
}
```

### **Topic Model**
```javascript
{
  user: ObjectId (ref: User),
  subject: String,
  topicName: String,
  status: String (pending/in-progress/completed),
  notes: String,
  lastStudied: Date,
  revisionCount: Number,
  accuracy: Number,
  totalAttempts: Number,
  correctAttempts: Number
}
```

### **StudyLog Model**
```javascript
{
  user: ObjectId (ref: User),
  subject: String (enum),
  topic: String,
  duration: Number (minutes),
  notes: String,
  date: Date
}
```

### **Mistake Model**
```javascript
{
  user: ObjectId (ref: User),
  questionText: String,
  options: [String],
  userAnswer: Mixed,
  correctAnswer: Mixed,
  explanation: String,
  subject: String,
  topic: String,
  testId: ObjectId (ref: Test),
  isRevised: Boolean (default: false),
  createdAt: Date
}
```

---

## 🔐 Security Features

1. **Authentication**: JWT-based token authentication
2. **Password Security**: Bcryptjs hashing with salt rounds
3. **Authorization**: Middleware-based route protection
4. **CORS**: Cross-origin resource sharing enabled
5. **File Upload Security**: Multer with file validation
6. **Environment Variables**: Sensitive data via .env
7. **Error Handling**: Global error middleware with custom AppError class

---

## 🚀 Performance Optimizations

1. **Test Caching**: AI-generated tests cached for 10 minutes
2. **Database Indexing**: User and test lookups optimized
3. **Lazy Loading**: Frontend components loaded on-demand via React Router
4. **Rate Limiting**: Middleware to prevent API abuse
5. **Exponential Backoff**: Retry logic for Gemini API with jitter
6. **Aggregation Pipeline**: MongoDB aggregation for statistics
7. **Socket.io Rooms**: Efficient group communication

---

## 🔧 Configuration

### **Environment Variables** (.env)
```
MONGODB_URI=<database_connection>
JWT_SECRET=<jwt_secret_key>
JWT_EXPIRE=<expiration_time>
GEMINI_API_KEY=<google_api_key>
GEMINI_MODEL=gemini-2.0-flash
GEMINI_TIMEOUT_MS=30000
AI_TEST_CACHE_TTL_MS=600000
CLOUDINARY_NAME=<cloudinary_name>
CLOUDINARY_KEY=<cloudinary_key>
CLOUDINARY_SECRET=<cloudinary_secret>
```

### **Test Constraints** (testBlueprint.js)
```javascript
{
  totalQuestions: 65,
  totalMarks: 100,
  durationMinutes: 180,
  questionDistribution: {
    mcq: { count: 30, marks: [1, 2] },
    msq: { count: 25, marks: [1, 2] },
    nat: { count: 10, marks: [1, 2] }
  }
}
```

---

## 📦 Project Scripts

### **Backend**
```bash
npm start              # Run production server
npm run dev           # Run with nodemon (development)
```

### **Frontend**
```bash
npm run dev           # Start Vite dev server
npm run build         # Build for production
```

---

## 🌟 Workflow Summary

### **Student Journey**

1. **Registration & Setup**
   - Register account with email/password
   - Topics auto-initialized from GATE syllabus
   - Set daily study goal

2. **Test Selection**
   - Choose between subject-wise tests or mock tests
   - View test details (duration, questions, marks)

3. **Test Attempt**
   - Interactive test engine with timer
   - Real-time question navigation
   - Automatic submission on timeout

4. **Result & Analysis**
   - Instant score calculation
   - Subject-wise breakdowns
   - Weak topics identification
   - Comparison with previous attempts

5. **Learning & Improvement**
   - Review mistakes automatically captured
   - Use AI doubt solver for clarification
   - Log study sessions
   - Track topic progress
   - Participate in group discussions

6. **Revision Planning**
   - Follow personalized revision recommendations
   - Mark mistakes as revised
   - Monitor study consistency (heatmap)
   - Update topic status

7. **Collaboration**
   - Join study groups
   - Discuss doubts with peers
   - Share resources and materials
   - Real-time group communication

---

## 📝 Summary

**PrepInsight** is a full-stack GATE preparation platform that combines:
- **Intelligent test generation** via AI (Google Gemini)
- **Comprehensive analytics** for performance tracking
- **Spaced repetition** for optimal revision planning
- **Real-time collaboration** via WebSockets
- **Modern tech stack** (React + Node.js + MongoDB)

The platform is designed to help GATE aspirants prepare efficiently through personalized learning paths, AI-powered doubt solving, and data-driven insights.

---

## 📁 File Structure Summary

- **Backend**: Express.js server with MongoDB, Socket.io, and Gemini API integration
- **Frontend**: React app with Vite, Chart.js for analytics, and real-time WebSocket support
- **Database**: MongoDB with 6 main collections (Users, Tests, Results, Mistakes, StudyLogs, Topics)
- **API**: RESTful API with 10+ route modules covering auth, tests, results, study logs, topics, mistakes, doubts, and materials
- **Real-time**: WebSocket-based group chat system with message persistence
- **AI Integration**: Google Gemini API for test generation and doubt solving

---

**Created**: May 13, 2026
**Version**: 1.0
