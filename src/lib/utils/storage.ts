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
  if (!str) {
    console.log('[Storage] No data found, using fallback:', fallback);
    return fallback;
  }
  try {
    const parsed = JSON.parse(str) as T;
    console.log('[Storage] Successfully parsed data:', parsed);
    return parsed;
  } catch (e) {
    console.error('[Storage] Error parsing JSON:', e);
    return fallback;
  }
};

// Helper to safely stringify and save JSON
const safeJSONSave = (key: string, data: any): void => {
  try {
    if (typeof window !== 'undefined') {
      console.log('[Storage] Saving data for key:', key, data);
      localStorage.setItem(key, JSON.stringify(data));
      console.log('[Storage] Data saved successfully');
      // Update global state
      globalState[key] = data;
      // Dispatch storage event to notify other components
      window.dispatchEvent(new StorageEvent('storage', {
        key: key,
        newValue: JSON.stringify(data)
      }));
    }
  } catch (e) {
    console.error('[Storage] Error saving to localStorage:', e);
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
  const adminState = localStorage.getItem(STORAGE_KEYS.IS_ADMIN) === 'true';
  console.log('[Storage] Admin state:', adminState);
  return adminState;
};

// Set admin status
export const setAdmin = (status: boolean): void => {
  if (typeof window === 'undefined') return;
  console.log('[Storage] Setting admin status:', status);
  localStorage.setItem(STORAGE_KEYS.IS_ADMIN, status.toString());
};

// Generic storage factory
const createStorage = <T extends { id: string }>(key: keyof typeof STORAGE_KEYS, mockData: T[]) => {
  const storage = {
    getAll: (): T[] => {
      console.log(`[Storage] Getting all data for ${key}`);
      if (typeof window === 'undefined') {
        console.log('[Storage] Server-side, returning mock data');
        return mockData;
      }
      const data = safeJSONParse(localStorage.getItem(STORAGE_KEYS[key]), mockData);
      console.log(`[Storage] Retrieved data for ${key}:`, data);
      return data;
    },

    save: (items: T[]): void => {
      if (typeof window === 'undefined') {
        console.log('[Storage] Server-side, skipping save');
        return;
      }
      if (!isAdmin()) {
        console.log('[Storage] Not admin, skipping save');
        return;
      }
      console.log(`[Storage] Saving items for ${key}:`, items);
      safeJSONSave(STORAGE_KEYS[key], items);
    },

    add: (item: Omit<T, "id">): T => {
      if (!isAdmin()) {
        console.log('[Storage] Not admin, cannot add item');
        throw new Error('Unauthorized');
      }
      
      const items = storage.getAll();
      const newItem = {
        ...item,
        id: `${key}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      } as T;
      
      console.log(`[Storage] Adding new item to ${key}:`, newItem);
      items.push(newItem);
      storage.save(items);
      return newItem;
    },

    update: (id: string, item: Omit<T, "id">): void => {
      if (!isAdmin()) {
        console.log('[Storage] Not admin, cannot update item');
        throw new Error('Unauthorized');
      }
      
      const items = storage.getAll();
      const index = items.findIndex(i => i.id === id);
      
      if (index !== -1) {
        items[index] = { ...item, id } as T;
        console.log(`[Storage] Updating item in ${key}:`, items[index]);
        storage.save(items);
      } else {
        console.log(`[Storage] Item with id ${id} not found in ${key}`);
      }
    },

    delete: (id: string): void => {
      if (!isAdmin()) {
        console.log('[Storage] Not admin, cannot delete item');
        throw new Error('Unauthorized');
      }
      
      const items = storage.getAll();
      const filtered = items.filter(i => i.id !== id);
      console.log(`[Storage] Deleting item from ${key}, items remaining:`, filtered.length);
      storage.save(filtered);
    }
  };

  return storage;
};

// Personal Info storage
export const personalInfoStorage = {
  get: (): PersonalInfo => {
    console.log('[Storage] Getting personal info');
    if (typeof window === 'undefined') {
      console.log('[Storage] Server-side, returning mock personal info');
      return mockPortfolioData.personalInfo;
    }
    const data = safeJSONParse(
      localStorage.getItem(STORAGE_KEYS.PERSONAL_INFO),
      mockPortfolioData.personalInfo
    );
    console.log('[Storage] Retrieved personal info:', data);
    return data;
  },

  save: (info: PersonalInfo): void => {
    if (typeof window === 'undefined') {
      console.log('[Storage] Server-side, skipping personal info save');
      return;
    }
    if (!isAdmin()) {
      console.log('[Storage] Not admin, skipping personal info save');
      return;
    }
    console.log('[Storage] Saving personal info:', info);
    safeJSONSave(STORAGE_KEYS.PERSONAL_INFO, info);
  }
};

// Create storage instances for each data type
export const experienceStorage = createStorage<Experience>('EXPERIENCES', mockPortfolioData.experiences);
export const projectStorage = createStorage<Project>('PROJECTS', mockPortfolioData.projects);
export const skillStorage = createStorage<Skill>('SKILLS', mockPortfolioData.skills);
export const educationStorage = createStorage<Education>('EDUCATION', mockPortfolioData.education); 