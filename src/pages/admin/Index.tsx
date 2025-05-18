import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import ProjectForm from "@/components/admin/projects/ProjectForm";

// Import admin components directly instead of lazy loading
import Dashboard from '@/components/admin/Dashboard';
import PersonalInfoManager from '@/components/admin/personal/PersonalInfoManager';
import ProjectsManager from '@/components/admin/projects/ProjectsManager';
import SkillsManager from '@/components/admin/skills/SkillsManager';
import ExperienceManager from '@/components/admin/experience/ExperienceManager';
import EducationManager from '@/components/admin/education/EducationManager';
import Settings from '@/pages/admin/Settings';

const AdminIndex = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="personal" element={<PersonalInfoManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/edit/:projectId" element={<ProjectForm />} />
          <Route path="skills" element={<SkillsManager />} />
          <Route path="experience" element={<ExperienceManager />} />
          <Route path="education" element={<EducationManager />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </AdminLayout>
  );
};

export default AdminIndex; 