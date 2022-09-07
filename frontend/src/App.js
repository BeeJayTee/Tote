import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages and components
import LandingPage from './pages/LandingPage'
import SellerDashboard from './pages/SellerDashboard'
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
              element={!user ? <LandingPage /> : <Navigate to="/SellerDashboard" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/SellerDashboard" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/SellerDashboard" />}
            />
            <Route
              path="/dashboard"
              element={user ? <SellerDashboard /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
