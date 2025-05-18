import { Experience, PersonalInfo, Project, Skill, Education } from '@/lib/types';
import { mockPortfolioData } from '@/lib/mockData';

// Storage keys
const STORAGE_KEYS = {
  IS_ADMIN: 'portfolio_is_admin',
  EXPERIENCES: 'portfolio_experiences',
  PERSONAL_INFO: 'portfolio_personal_info',
  PROJECTS: 'portfolio_projects',
  SKILLS: 'portfolio_skills',
  EDUCATION: 'portfolio_education'
} as const;

// Global state to ensure data consistency across components
const globalState: {
  [key: string]: any;
} = {};

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

// Helper to safely stringify and save JSON
const safeJSONSave = (key: string, data: any): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
      // Update global state
      globalState[key] = data;
      // Dispatch storage event to notify other components
      window.dispatchEvent(new StorageEvent('storage', {
        key: key,
        newValue: JSON.stringify(data)
      }));
    }
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
};

// Helper to get data from storage or global state
const getData = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') {
    return fallback;
  }
  
  // First check global state
  if (globalState[key] !== undefined) {
    return globalState[key];
  }
  
  // Then check localStorage
  const storedData = localStorage.getItem(key);
  const parsedData = storedData ? safeJSONParse(storedData, fallback) : fallback;
  
  // Update global state
  globalState[key] = parsedData;
  
  return parsedData;
};

// Check if user is admin
export const isAdmin = (): boolean => {
  if (typeof window === 'undefined') return false;
  const adminState = getData<string>(STORAGE_KEYS.IS_ADMIN, 'false');
  return adminState === 'true';
};

// Set admin status
export const setAdmin = (status: boolean): void => {
  if (typeof window === 'undefined') return;
  safeJSONSave(STORAGE_KEYS.IS_ADMIN, status.toString());
};

// Generic storage factory
const createStorage = <T extends { id: string }>(key: keyof typeof STORAGE_KEYS, mockData: T[]) => {
  const storage = {
    getAll: (): T[] => {
      return getData(STORAGE_KEYS[key], mockData);
    },

    save: (items: T[]): void => {
      if (typeof window === 'undefined' || !isAdmin()) return;
      safeJSONSave(STORAGE_KEYS[key], items);
    },

    add: (item: Omit<T, "id">): T => {
      if (!isAdmin()) throw new Error('Unauthorized');
      
      const items = storage.getAll();
      const newItem = {
        ...item,
        id: `${key}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      } as T;
      
      items.push(newItem);
      storage.save(items);
      return newItem;
    },

    update: (id: string, item: Omit<T, "id">): void => {
      if (!isAdmin()) throw new Error('Unauthorized');
      
      const items = storage.getAll();
      const index = items.findIndex(i => i.id === id);
      
      if (index !== -1) {
        items[index] = { ...item, id } as T;
        storage.save(items);
      }
    },

    delete: (id: string): void => {
      if (!isAdmin()) throw new Error('Unauthorized');
      
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
    return getData(STORAGE_KEYS.PERSONAL_INFO, mockPortfolioData.personalInfo);
  },

  save: (info: PersonalInfo): void => {
    if (typeof window === 'undefined' || !isAdmin()) return;
    safeJSONSave(STORAGE_KEYS.PERSONAL_INFO, info);
  }
};

// Create storage instances for each data type
export const experienceStorage = createStorage<Experience>('EXPERIENCES', mockPortfolioData.experiences);
export const projectStorage = createStorage<Project>('PROJECTS', mockPortfolioData.projects);
export const skillStorage = createStorage<Skill>('SKILLS', mockPortfolioData.skills);
export const educationStorage = createStorage<Education>('EDUCATION', mockPortfolioData.education); 