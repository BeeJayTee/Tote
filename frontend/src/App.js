import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "./hooks/useAuthContext";

// global styles
import "./styles/app.css";

// pages and components
import LandingPage from "./landingPage/LandingPage";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./global/Navbar";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import MarketManager from "./pages/Admin/MarketManager";
import AdminManager from "./pages/Admin/AdminManager";

function App() {
  const [buyerDisplay, setBuyerDisplay] = useState("market");

  const { user } = useAuthContext();

  return (
    <div className="App m-auto">
      <Router>
        <Navbar setBuyerDisplay={setBuyerDisplay} buyerDisplay={buyerDisplay} />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                !user ? (
                  <LandingPage />
                ) : user.userType === process.env.REACT_APP_ADMIN_ID ? (
                  <Navigate to="/app/admin-dashboard" />
                ) : (
                  <Navigate to="/app/dashboard" />
                )
              }
            />
            <Route
              path="/app"
              element={
                !user ? (
                  <Login />
                ) : user.userType === process.env.REACT_APP_ADMIN_ID ? (
                  <Navigate to="/app/admin-dashboard" />
                ) : (
                  <Navigate to="/app/dashboard" />
                )
              }
            />
            <Route
              path="/app/login"
              element={!user ? <Login /> : <Navigate to="/app/dashboard" />}
            />
            <Route
              path="/app/signup"
              element={!user ? <Signup /> : <Navigate to="/app/dashboard" />}
            />
            <Route
              path="/app/dashboard"
              element={
                user && user.userType === process.env.REACT_APP_SELLER_ID ? (
                  <SellerDashboard />
                ) : user && user.userType === process.env.REACT_APP_BUYER_ID ? (
                  <BuyerDashboard
                    buyerDisplay={buyerDisplay}
                    setBuyerDisplay={setBuyerDisplay}
                  />
                ) : (
                  <Navigate to="/app/login" />
                )
              }
            />
            <Route
              path="/app/admin"
              element={
                !user ? <AdminLogin /> : <Navigate to="/app/admin-dashboard" />
              }
            />
            <Route
              path="/app/admin-dashboard"
              element={
                user && user.userType === process.env.REACT_APP_ADMIN_ID ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/app/admin" />
                )
              }
            />
            <Route
              path="/app/market-manager"
              element={
                user && user.userType === process.env.REACT_APP_ADMIN_ID ? (
                  <MarketManager />
                ) : (
                  <Navigate to="/app/admin" />
                )
              }
            />
            <Route
              path="/app/admin-manager"
              element={
                user && user.userType === process.env.REACT_APP_ADMIN_ID ? (
                  <AdminManager />
                ) : (
                  <Navigate to="/app/admin" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
