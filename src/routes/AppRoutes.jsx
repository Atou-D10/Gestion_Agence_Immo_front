import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import DashboardGestionnaire from '../pages/DashboardGestionnaire';
import DashboardClient from '../pages/DashboardClient';
import Properties from '../components/Property';
import ProtectedRoute from '/src/ProtectedRoute';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/properties" element={<Properties />} />
      <Route
        path="/dashboard-gestionnaire"
        element={
          <ProtectedRoute>
            <DashboardGestionnaire />
          </ProtectedRoute>
        }
      />

      <Route path="/dashboard-client" element={<DashboardClient />} />
    </Routes>
  );
}
