import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from '@/lib/context/PortfolioContext';
import { AuthProvider } from '@/lib/auth/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import BestWork from '@/components/BestWork';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import AdminRoutes from '@/pages/AdminRoutes';
import NotFound from '@/pages/NotFound';
import './App.css';

// Lazy load the admin section
const AdminIndex = lazy(() => import('@/pages/admin/Index'));
const AdminLogin = lazy(() => import('@/pages/admin/Login'));

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <Routes>
            {/* Admin routes */}
            <Route path="/admin/login" element={
              <Suspense fallback={<div className="min-h-screen grid place-items-center bg-background"><p className="text-white font-tech">Loading login page...</p></div>}>
                <AdminLogin />
              </Suspense>
            } />
            
            <Route path="/admin/*" element={
              <Suspense fallback={<div className="min-h-screen grid place-items-center bg-background"><p className="text-white font-tech">Loading admin panel...</p></div>}>
                <ProtectedRoute>
                  <AdminIndex />
                </ProtectedRoute>
              </Suspense>
            } />
            
            {/* Public routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <Hero />
                <BestWork />
                <About />
                <Skills />
                <Projects />
                <Contact />
                <Footer />
              </>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
