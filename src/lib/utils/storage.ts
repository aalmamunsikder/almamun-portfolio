import { Experience, PersonalInfo, Project, Skill, Education } from '@/lib/types';
import { mockPortfolioData } from '@/lib/mockData';

// Storage keys
const STORAGE_KEYS = {
  EXPERIENCES: 'portfolio_experiences',
  PERSONAL_INFO: 'portfolio_personal_info',
  PROJECTS: 'portfolio_projects',
  SKILLS: 'portfolio_skills',
  EDUCATION: 'portfolio_education',
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

// Generic storage factory
const createStorage = <T extends { id: string }>(storageKey: keyof typeof STORAGE_KEYS, mockData: T[]) => {
  const storage = {
    getAll: (): T[] => {
      if (typeof window === 'undefined') return mockData;
      return safeJSONParse(localStorage.getItem(STORAGE_KEYS[storageKey]), mockData);
    },

    save: (items: T[]): void => {
      if (typeof window === 'undefined') {
        console.log(`Saving ${storageKey} in server mode:`, items);
        return;
      }
      localStorage.setItem(STORAGE_KEYS[storageKey], JSON.stringify(items));
    },

    add: (item: Omit<T, "id">): T => {
      const items = storage.getAll();
      const newItem = {
        ...item,
        id: `${storageKey}_${Date.now()}`
      } as T;
      
      items.push(newItem);
      storage.save(items);
      return newItem;
    },

    update: (id: string, item: Omit<T, "id">): void => {
      const items = storage.getAll();
      const index = items.findIndex(i => i.id === id);
      
      if (index !== -1) {
        items[index] = { ...item, id } as T;
        storage.save(items);
      }
    },

    delete: (id: string): void => {
      const items = storage.getAll();
      const filtered = items.filter(i => i.id !== id);
      storage.save(filtered);
    }
  };

  return storage;
};

// Personal Info storage
export const personalInfoStorage = {
  get: (): PersonalInfo => {
    if (typeof window === 'undefined') return mockPortfolioData.personalInfo;
    return safeJSONParse(
      localStorage.getItem(STORAGE_KEYS.PERSONAL_INFO),
      mockPortfolioData.personalInfo
    );
  },

  save: (info: PersonalInfo): void => {
    if (typeof window === 'undefined') {
      console.log('Saving personal info in server mode:', info);
      return;
    }
    localStorage.setItem(STORAGE_KEYS.PERSONAL_INFO, JSON.stringify(info));
  }
};

// Create storage instances for each data type
export const experienceStorage = createStorage<Experience>('EXPERIENCES', mockPortfolioData.experiences);
export const projectStorage = createStorage<Project>('PROJECTS', mockPortfolioData.projects);
export const skillStorage = createStorage<Skill>('SKILLS', mockPortfolioData.skills);
export const educationStorage = createStorage<Education>('EDUCATION', mockPortfolioData.education); 