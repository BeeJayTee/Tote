import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages and components
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dahboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'

function App() {
  const { user } = useAuthContext()
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={!user ? <LandingPage /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
