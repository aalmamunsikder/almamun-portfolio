import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Skill, Experience, Education, PersonalInfo } from '@/lib/types';
import defaultData from '@/data/default-data.json';

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
  updateProjects: (projects: Project[]) => void;
  updateSkills: (skills: Skill[]) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateEducation: (education: Education[]) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      const savedData = localStorage.getItem('portfolio_data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return {
          personalInfo: parsedData.personalInfo || defaultData.personalInfo,
          projects: parsedData.projects || defaultData.projects,
          skills: parsedData.skills || defaultData.skills,
          experiences: parsedData.experiences || defaultData.experiences,
          education: parsedData.education || defaultData.education,
        };
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    }
    return defaultData;
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_data', JSON.stringify(portfolioData));
    } catch (error) {
      console.error('Error saving portfolio data:', error);
    }
  }, [portfolioData]);

  const updatePersonalInfo = (info: PersonalInfo) => {
    setPortfolioData(prev => ({ ...prev, personalInfo: info }));
  };

  const updateProjects = (projects: Project[]) => {
    setPortfolioData(prev => ({ ...prev, projects }));
  };

  const updateSkills = (skills: Skill[]) => {
    setPortfolioData(prev => ({ ...prev, skills }));
  };

  const updateExperiences = (experiences: Experience[]) => {
    setPortfolioData(prev => ({ ...prev, experiences }));
  };

  const updateEducation = (education: Education[]) => {
    setPortfolioData(prev => ({ ...prev, education }));
  };

  const value = {
    portfolioData,
    updatePersonalInfo,
    updateProjects,
    updateSkills,
    updateExperiences,
    updateEducation,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}; 