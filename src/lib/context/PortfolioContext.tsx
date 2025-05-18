'use client';

import React, { createContext, useContext } from 'react';
import { mockPortfolioData } from '@/lib/mockData';
import { Experience, PersonalInfo, Project, Skill, Education } from '@/lib/types';

interface PortfolioContextType {
  portfolioData: {
    personalInfo: PersonalInfo;
    projects: Project[];
    skills: Skill[];
    experiences: Experience[];
    education: Education[];
  };
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  return (
    <PortfolioContext.Provider
      value={{
        portfolioData: mockPortfolioData,
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