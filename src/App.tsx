// src/App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthContainer } from "./pages/AuthContainer";
import {DashboardPage} from "./pages/DashboardPage";
import { DevicesPage } from "./pages/DevicesPage";
import { Template } from "./layout/Template";
import { MaintenancePage } from "./pages/MaintenancePage";
import { SettingsPage } from "./pages/SettingsPage";


function AppRoutes() {
  // Ubah inisialnya menjadi `true` agar aplikasi membaca bahwa kita "sudah login" sejak awal
  const [isAuthSuccess, setIsAuthSuccess] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    setIsAuthSuccess(true);
    navigate("/dashboard", { replace: true });
  };

  const handleLogout = () => {
    setIsAuthSuccess(false);
    navigate("/", { replace: true });
  };

  const handlePageChange = (page: string) => {
    switch (page) {
      case 'DASHBOARD':
        navigate('/dashboard');
        break;
      case 'PERANGKAT':
        navigate('/devices');
        break;
      case 'PERBAIKAN':
        navigate('/maintenance');
        break;
      default:
        navigate(`/${page.toLowerCase()}`);
    }
  };

  return (
    <Routes>
      {/* Halaman Login */}
      <Route 
        path="/" 
        element={
          isAuthSuccess ? <Navigate to="/dashboard" replace /> : <AuthContainer onAuthSuccess={handleAuthSuccess} />
        } 
      />

      {/* Rute Terproteksi */}
      <Route 
        path="/dashboard" 
        element={
          isAuthSuccess ? (
            // Bungkus halaman dengan Template, oper fungsi navigate untuk ganti halaman
            <Template currentPage="DASHBOARD" onPageChange={handlePageChange} onLogout={handleLogout}>
              <DashboardPage/>
            </Template>
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />

      <Route 
        path="/devices" 
        element={
          isAuthSuccess ? (
            // Sesuaikan path jika nama halaman kamu lowercase (misal: /devices berarti id-nya 'perangkat' atau ubah rutenya)
            <Template currentPage="PERANGKAT" onPageChange={handlePageChange} onLogout={handleLogout}>
              <DevicesPage />
            </Template>
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />

      <Route 
        path="/maintenance" 
        element={
          isAuthSuccess ? (
            // Sesuaikan path jika nama halaman kamu lowercase (misal: /devices berarti id-nya 'perangkat' atau ubah rutenya)
            <Template currentPage="MAINTENANCE" onPageChange={handlePageChange} onLogout={handleLogout}>
              <MaintenancePage />
            </Template>
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />

      <Route 
        path="/settings" 
        element={
          isAuthSuccess ? (
            // Sesuaikan path jika nama halaman kamu lowercase (misal: /devices berarti id-nya 'perangkat' atau ubah rutenya)
            <Template currentPage="SETTINGS" onPageChange={handlePageChange} onLogout={handleLogout}>
              <SettingsPage />
            </Template>
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />

      <Route path="*" element={<Navigate to={isAuthSuccess ? "/dashboard" : "/"} replace />} />
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