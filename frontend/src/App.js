import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages and components
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dahboard'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<LandingPage />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
