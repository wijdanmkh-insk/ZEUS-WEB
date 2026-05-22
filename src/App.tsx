// src/App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthContainer } from "./pages/AuthContainer";
import DashboardPage from "./pages/DashboardPage";

// Komponen penengah untuk menggunakan hooks dari react-router-dom
function AppRoutes() {
  const [isAuthSuccess, setIsAuthSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    setIsAuthSuccess(true);
    navigate("/dashboard", { replace: true });
  };

  const handleLogout = () => {
    setIsAuthSuccess(false);
    navigate("/", { replace: true });
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthSuccess ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AuthContainer onAuthSuccess={handleAuthSuccess} />
          )
        } 
      />
      
      <Route 
        path="/dashboard" 
        element={
          isAuthSuccess ? (
            <DashboardPage onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}