import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudyLog from './pages/StudyLog';
import Topics from './pages/Topics';
import Tests from './pages/Tests';
import TestEngine from './pages/TestEngine';
import Analysis from './pages/Analysis';
import MistakeBook from './pages/MistakeBook';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/study-log" element={<PrivateRoute><StudyLog /></PrivateRoute>} />
          <Route path="/topics" element={<PrivateRoute><Topics /></PrivateRoute>} />
          <Route path="/tests" element={<PrivateRoute><Tests /></PrivateRoute>} />
          <Route path="/test/:id" element={<PrivateRoute><TestEngine /></PrivateRoute>} />
          <Route path="/analysis" element={<PrivateRoute><Analysis /></PrivateRoute>} />
          <Route path="/mistakes" element={<PrivateRoute><MistakeBook /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;