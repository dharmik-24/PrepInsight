import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import WelcomeSplash from './pages/WelcomeSplash';
import Dashboard from './pages/Dashboard';
import StudyLog from './pages/StudyLog';
import Topics from './pages/Topics';
import Tests from './pages/Tests';
import TestSelection from './pages/TestSelection';
import MockTests from './pages/MockTests';
import MockTestAttempt from './pages/MockTestAttempt';
import TestEngine from './pages/TestEngine';
import Analysis from './pages/Analysis';
import MistakeBook from './pages/MistakeBook';
import Profile from "./pages/Profile";
import InfoSharing from './pages/InfoSharing';
import AddMaterial from './pages/AddMaterial';

import ResultPage from './pages/ResultPage';

function AppLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/welcome';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/welcome"
            element={<PrivateRoute><WelcomeSplash /></PrivateRoute>}
          />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/study-log" element={<PrivateRoute><StudyLog /></PrivateRoute>} />
          <Route path="/topics" element={<PrivateRoute><Topics /></PrivateRoute>} />
          <Route path="/tests" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
          <Route path="/subjectwise-tests" element={<PrivateRoute><Tests /></PrivateRoute>} />
          <Route path="/mock-tests" element={<PrivateRoute><MockTests /></PrivateRoute>} />
          <Route path="/mock-test/:id" element={<PrivateRoute><MockTestAttempt /></PrivateRoute>} />
          <Route path="/test/:id" element={<PrivateRoute><TestEngine /></PrivateRoute>} />
          <Route path="/analysis" element={<PrivateRoute><Analysis /></PrivateRoute>} />
          <Route path="/mistakes" element={<PrivateRoute><MistakeBook /></PrivateRoute>} />
          <Route path="/result" element={<PrivateRoute><ResultPage /></PrivateRoute>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/info-sharing" element={<PrivateRoute><InfoSharing /></PrivateRoute>} />
          <Route path="/add-material" element={<PrivateRoute><AddMaterial /></PrivateRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;