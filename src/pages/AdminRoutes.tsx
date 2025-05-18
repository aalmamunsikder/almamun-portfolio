import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PortfolioProvider } from "@/lib/context/PortfolioContext";

// Admin layout and dashboard
import AdminLayout from "@/components/admin/AdminLayout";
import Dashboard from "@/components/admin/Dashboard";

// Project components
import ProjectsManager from "@/components/admin/projects/ProjectsManager";
import ProjectForm from "@/components/admin/projects/ProjectForm";

// Placeholder components for other sections (to be implemented)
const PersonalInfo = () => <div className="text-white font-tech text-2xl">Personal Info (Coming Soon)</div>;
const SkillsManager = () => <div className="text-white font-tech text-2xl">Skills Manager (Coming Soon)</div>;
const ExperienceManager = () => <div className="text-white font-tech text-2xl">Experience Manager (Coming Soon)</div>;
const EducationManager = () => <div className="text-white font-tech text-2xl">Education Manager (Coming Soon)</div>;
const Settings = () => <div className="text-white font-tech text-2xl">Settings (Coming Soon)</div>;

// Authentication (mock for now)
const isAuthenticated = true; // This would normally check for a valid session/token

const AdminRoutes = () => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PortfolioProvider>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="personal" element={<PersonalInfo />} />
          
          {/* Projects routes */}
          <Route path="projects">
            <Route index element={<ProjectsManager />} />
            <Route path="new" element={<ProjectForm />} />
            <Route path="edit/:projectId" element={<ProjectForm />} />
          </Route>
          
          <Route path="skills" element={<SkillsManager />} />
          <Route path="experience" element={<ExperienceManager />} />
          <Route path="education" element={<EducationManager />} />
          <Route path="settings" element={<Settings />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </PortfolioProvider>
  );
};

export default AdminRoutes; 