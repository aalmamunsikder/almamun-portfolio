import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Skill, Experience, Education, PersonalInfo } from '@/lib/types';
import { mockPortfolioData } from '@/lib/mockData';
import { experienceStorage, personalInfoStorage } from '@/lib/utils/storage';

interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
}

interface PortfolioContextType {
  portfolioData: PortfolioData;
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

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    ...mockPortfolioData,
    personalInfo: personalInfoStorage.get(),
    experiences: experienceStorage.getAll()
  });

  // Personal Info handler
  const updatePersonalInfo = (info: PersonalInfo) => {
    personalInfoStorage.save(info);
    setPortfolioData(prev => ({ ...prev, personalInfo: info }));
  };

  // Experience handlers
  const addExperience = (experience: Omit<Experience, "id">) => {
    const newExperience = experienceStorage.add(experience);
    setPortfolioData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience]
    }));
  };

  const updateExperience = (id: string, experience: Omit<Experience, "id">) => {
    experienceStorage.update(id, experience);
    setPortfolioData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...experience, id } : exp
      )
    }));
  };

  const deleteExperience = (id: string) => {
    experienceStorage.delete(id);
    setPortfolioData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  // Project handlers
  const addProject = (project: Omit<Project, "id">) => {
    const newProject = { ...project, id: `proj_${Date.now()}` };
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, project: Omit<Project, "id">) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...project, id } : p)
    }));
  };

  const deleteProject = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Skill handlers
  const addSkill = (skill: Omit<Skill, "id">) => {
    const newSkill = { ...skill, id: `skill_${Date.now()}` };
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, skill: Omit<Skill, "id">) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...skill, id } : s)
    }));
  };

  const deleteSkill = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  // Education handlers
  const addEducation = (education: Omit<Education, "id">) => {
    const newEducation = { ...education, id: `edu_${Date.now()}` };
    setPortfolioData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, education: Omit<Education, "id">) => {
    setPortfolioData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...education, id } : e)
    }));
  };

  const deleteEducation = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  const value = {
    portfolioData,
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
    deleteEducation
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}; 