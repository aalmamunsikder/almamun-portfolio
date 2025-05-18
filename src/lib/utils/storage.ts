import { Experience } from '@/lib/types';
import { mockPortfolioData } from '@/lib/mockData';

// Storage keys
const STORAGE_KEYS = {
  EXPERIENCES: 'portfolio_experiences',
  SETTINGS: 'portfolio_settings',
  THEME: 'portfolio_theme'
} as const;

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development';

// Helper to safely parse JSON
const safeJSONParse = <T>(str: string | null, fallback: T): T => {
  if (!str) return fallback;
  try {
    return JSON.parse(str) as T;
  } catch (e) {
    console.error('Error parsing JSON:', e);
    return fallback;
  }
};

// Experience storage
export const experienceStorage = {
  getAll: (): Experience[] => {
    if (isDev) {
      return safeJSONParse(
        localStorage.getItem(STORAGE_KEYS.EXPERIENCES),
        mockPortfolioData.experiences
      );
    }
    // In production, use mock data
    return mockPortfolioData.experiences;
  },

  save: (experiences: Experience[]): void => {
    if (isDev) {
      localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(experiences));
    }
    // In production, we don't save to localStorage
    console.log('Saving experiences in production mode:', experiences);
  },

  add: (experience: Omit<Experience, "id">): Experience => {
    const experiences = experienceStorage.getAll();
    const newExperience = {
      ...experience,
      id: `exp_${Date.now()}`
    };
    
    experiences.push(newExperience);
    experienceStorage.save(experiences);
    return newExperience;
  },

  update: (id: string, experience: Omit<Experience, "id">): void => {
    const experiences = experienceStorage.getAll();
    const index = experiences.findIndex(e => e.id === id);
    
    if (index !== -1) {
      experiences[index] = { ...experience, id };
      experienceStorage.save(experiences);
    }
  },

  delete: (id: string): void => {
    const experiences = experienceStorage.getAll();
    const filtered = experiences.filter(e => e.id !== id);
    experienceStorage.save(filtered);
  }
}; 