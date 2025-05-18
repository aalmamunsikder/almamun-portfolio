import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Lazy load admin components
const AdminLogin = lazy(() => import('./admin/Login'));
const AdminIndex = lazy(() => import('./admin/Index'));

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={
        <Suspense fallback={<div className="min-h-screen grid place-items-center bg-background"><p className="text-white font-tech">Loading login page...</p></div>}>
          <AdminLogin />
        </Suspense>
      } />
      
      <Route path="/*" element={
        <Suspense fallback={<div className="min-h-screen grid place-items-center bg-background"><p className="text-white font-tech">Loading admin panel...</p></div>}>
          <ProtectedRoute>
            <AdminIndex />
          </ProtectedRoute>
        </Suspense>
      } />
    </Routes>
  );
};

export default AdminRoutes; 