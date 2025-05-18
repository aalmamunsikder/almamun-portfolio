import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Skill, Experience, Education, PersonalInfo } from '@/lib/types';
import { mockPortfolioData } from '@/lib/mockData';
import { 
  experienceStorage, 
  personalInfoStorage,
  projectStorage,
  skillStorage,
  educationStorage,
  isAdmin,
  setAdmin
} from '@/lib/utils/storage';

interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
}

interface PortfolioContextType {
  portfolioData: PortfolioData;
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

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminState, setAdminState] = useState(isAdmin());
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    personalInfo: personalInfoStorage.get(),
    projects: projectStorage.getAll(),
    skills: skillStorage.getAll(),
    experiences: experienceStorage.getAll(),
    education: educationStorage.getAll()
  });

  // Admin handlers
  const login = (password: string): boolean => {
    const isValid = password === ADMIN_PASSWORD;
    setAdminState(isValid);
    setAdmin(isValid);
    return isValid;
  };

  const logout = () => {
    setAdminState(false);
    setAdmin(false);
  };

  // Personal Info handler
  const updatePersonalInfo = (info: PersonalInfo) => {
    if (!adminState) return;
    personalInfoStorage.save(info);
    setPortfolioData(prev => ({ ...prev, personalInfo: info }));
  };

  // Project handlers
  const addProject = (project: Omit<Project, "id">) => {
    if (!adminState) return;
    const newProject = projectStorage.add(project);
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, project: Omit<Project, "id">) => {
    if (!adminState) return;
    projectStorage.update(id, project);
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...project, id } : p)
    }));
  };

  const deleteProject = (id: string) => {
    if (!adminState) return;
    projectStorage.delete(id);
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Skill handlers
  const addSkill = (skill: Omit<Skill, "id">) => {
    if (!adminState) return;
    const newSkill = skillStorage.add(skill);
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, skill: Omit<Skill, "id">) => {
    if (!adminState) return;
    skillStorage.update(id, skill);
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...skill, id } : s)
    }));
  };

  const deleteSkill = (id: string) => {
    if (!adminState) return;
    skillStorage.delete(id);
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  // Experience handlers
  const addExperience = (experience: Omit<Experience, "id">) => {
    if (!adminState) return;
    const newExperience = experienceStorage.add(experience);
    setPortfolioData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience]
    }));
  };

  const updateExperience = (id: string, experience: Omit<Experience, "id">) => {
    if (!adminState) return;
    experienceStorage.update(id, experience);
    setPortfolioData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...experience, id } : exp
      )
    }));
  };

  const deleteExperience = (id: string) => {
    if (!adminState) return;
    experienceStorage.delete(id);
    setPortfolioData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  // Education handlers
  const addEducation = (education: Omit<Education, "id">) => {
    if (!adminState) return;
    const newEducation = educationStorage.add(education);
    setPortfolioData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, education: Omit<Education, "id">) => {
    if (!adminState) return;
    educationStorage.update(id, education);
    setPortfolioData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...education, id } : e)
    }));
  };

  const deleteEducation = (id: string) => {
    if (!adminState) return;
    educationStorage.delete(id);
    setPortfolioData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  const value = {
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