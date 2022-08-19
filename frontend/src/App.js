import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages and components
import Dashboard from './pages/Dahboard'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Login />}
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
