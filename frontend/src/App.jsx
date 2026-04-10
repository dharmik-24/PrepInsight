<<<<<<< HEAD
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
<<<<<<< HEAD
import WelcomeSplash from './pages/WelcomeSplash';
=======
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
import Dashboard from './pages/Dashboard';
import StudyLog from './pages/StudyLog';
import Topics from './pages/Topics';
import Tests from './pages/Tests';
import TestEngine from './pages/TestEngine';
import Analysis from './pages/Analysis';
import MistakeBook from './pages/MistakeBook';

<<<<<<< HEAD
function AppLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/welcome';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
=======
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
<<<<<<< HEAD
          <Route
            path="/welcome"
            element={<PrivateRoute><WelcomeSplash /></PrivateRoute>}
          />
=======
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/study-log" element={<PrivateRoute><StudyLog /></PrivateRoute>} />
          <Route path="/topics" element={<PrivateRoute><Topics /></PrivateRoute>} />
          <Route path="/tests" element={<PrivateRoute><Tests /></PrivateRoute>} />
          <Route path="/test/:id" element={<PrivateRoute><TestEngine /></PrivateRoute>} />
          <Route path="/analysis" element={<PrivateRoute><Analysis /></PrivateRoute>} />
          <Route path="/mistakes" element={<PrivateRoute><MistakeBook /></PrivateRoute>} />
<<<<<<< HEAD
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
=======
        </Routes>
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;