'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  personalInfoStorage,
  projectStorage,
  skillStorage,
  experienceStorage,
  educationStorage,
  isAdmin,
  setAdmin
} from '@/lib/utils/storage';
import { Experience, PersonalInfo, Project, Skill, Education } from '@/lib/types';

interface PortfolioContextType {
  portfolioData: {
    personalInfo: PersonalInfo;
    projects: Project[];
    skills: Skill[];
    experiences: Experience[];
    education: Education[];
  };
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updatePersonalInfo: (info: PersonalInfo) => void;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Omit<Project, "id">) => void;
  deleteProject: (id: string) => void;
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (id: string, skill: Omit<Skill, "id">) => void;
  deleteSkill: (id: string) => void;
  addExperience: (experience: Omit<Experience, "id">) => void;
  updateExperience: (id: string, experience: Omit<Experience, "id">) => void;
  deleteExperience: (id: string) => void;
  addEducation: (education: Omit<Education, "id">) => void;
  updateEducation: (id: string, education: Omit<Education, "id">) => void;
  deleteEducation: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [adminState, setAdminState] = useState(isAdmin());
  const [portfolioData, setPortfolioData] = useState({
    personalInfo: personalInfoStorage.get(),
    projects: projectStorage.getAll(),
    skills: skillStorage.getAll(),
    experiences: experienceStorage.getAll(),
    education: educationStorage.getAll(),
  });

  // Function to refresh all data
  const refreshData = () => {
    setPortfolioData({
      personalInfo: personalInfoStorage.get(),
      projects: projectStorage.getAll(),
      skills: skillStorage.getAll(),
      experiences: experienceStorage.getAll(),
      education: educationStorage.getAll(),
    });
  };

  // Listen for storage events
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key && event.key.startsWith('portfolio_')) {
        refreshData();
      }
    };

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);

    // Initial data load
    refreshData();

    // Set up periodic refresh as a backup
    const intervalId = setInterval(refreshData, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const login = (password: string): boolean => {
    // For development, use a default password if environment variable is not set
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    const isValid = password === adminPassword;
    
    if (isValid) {
      setAdmin(true);
      setAdminState(true);
    }
    return isValid;
  };

  const logout = () => {
    setAdmin(false);
    setAdminState(false);
  };

  const updatePersonalInfo = (info: PersonalInfo) => {
    try {
      personalInfoStorage.save(info);
      setPortfolioData(prev => ({ ...prev, personalInfo: info }));
    } catch (error) {
      console.error('Error updating personal info:', error);
    }
  };

  const addProject = (project: Omit<Project, "id">) => {
    try {
      const newProject = projectStorage.add(project);
      setPortfolioData(prev => ({
        ...prev,
        projects: [...prev.projects, newProject]
      }));
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const updateProject = (id: string, project: Omit<Project, "id">) => {
    try {
      projectStorage.update(id, project);
      setPortfolioData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === id ? { ...project, id } : p)
      }));
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = (id: string) => {
    try {
      projectStorage.delete(id);
      setPortfolioData(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const addSkill = (skill: Omit<Skill, "id">) => {
    try {
      const newSkill = skillStorage.add(skill);
      setPortfolioData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const updateSkill = (id: string, skill: Omit<Skill, "id">) => {
    try {
      skillStorage.update(id, skill);
      setPortfolioData(prev => ({
        ...prev,
        skills: prev.skills.map(s => s.id === id ? { ...skill, id } : s)
      }));
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  const deleteSkill = (id: string) => {
    try {
      skillStorage.delete(id);
      setPortfolioData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const addExperience = (experience: Omit<Experience, "id">) => {
    try {
      const newExperience = experienceStorage.add(experience);
      setPortfolioData(prev => ({
        ...prev,
        experiences: [...prev.experiences, newExperience]
      }));
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  };

  const updateExperience = (id: string, experience: Omit<Experience, "id">) => {
    try {
      experienceStorage.update(id, experience);
      setPortfolioData(prev => ({
        ...prev,
        experiences: prev.experiences.map(e => e.id === id ? { ...experience, id } : e)
      }));
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };

  const deleteExperience = (id: string) => {
    try {
      experienceStorage.delete(id);
      setPortfolioData(prev => ({
        ...prev,
        experiences: prev.experiences.filter(e => e.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  const addEducation = (education: Omit<Education, "id">) => {
    try {
      const newEducation = educationStorage.add(education);
      setPortfolioData(prev => ({
        ...prev,
        education: [...prev.education, newEducation]
      }));
    } catch (error) {
      console.error('Error adding education:', error);
    }
  };

  const updateEducation = (id: string, education: Omit<Education, "id">) => {
    try {
      educationStorage.update(id, education);
      setPortfolioData(prev => ({
        ...prev,
        education: prev.education.map(e => e.id === id ? { ...education, id } : e)
      }));
    } catch (error) {
      console.error('Error updating education:', error);
    }
  };

  const deleteEducation = (id: string) => {
    try {
      educationStorage.delete(id);
      setPortfolioData(prev => ({
        ...prev,
        education: prev.education.filter(e => e.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        isAdmin: adminState,
        login,
        logout,
        updatePersonalInfo,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        updateSkill,
        deleteSkill,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
} 