import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from '@/lib/context/PortfolioContext';
import { AuthProvider } from '@/lib/auth/AuthContext';
import Index from '@/pages/Index';
import AdminRoutes from '@/pages/AdminRoutes';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <Routes>
            {/* Admin routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
            
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
