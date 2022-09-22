import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'


// pages and components
import LandingPage from './pages/LandingPage'
import SellerDashboard from './pages/SellerDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import AdminLogin from './pages/AdminLogin'

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
              element={user && user.userType === process.env.REACT_APP_SELLER_ID ? <SellerDashboard /> : user && user.userType === process.env.REACT_APP_BUYER_ID ? <BuyerDashboard /> : <Navigate to="/login" />}
            />
            <Route 
              path="/admin"
              element={<AdminLogin />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
