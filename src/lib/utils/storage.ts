import { Experience, PersonalInfo, Project, Skill, Education } from '@/lib/types';
import { mockPortfolioData } from '@/lib/mockData';

// API endpoints
const API_ENDPOINTS = {
  EXPERIENCES: '/api/experiences',
  PERSONAL_INFO: '/api/personal-info',
  PROJECTS: '/api/projects',
  SKILLS: '/api/skills',
  EDUCATION: '/api/education'
} as const;

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

// Generic API fetch with error handling
const apiFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

// Generic storage factory
const createStorage = <T extends { id: string }>(endpoint: keyof typeof API_ENDPOINTS, mockData: T[]) => {
  const storage = {
    getAll: async (): Promise<T[]> => {
      try {
        return await apiFetch<T[]>(API_ENDPOINTS[endpoint]);
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return mockData;
      }
    },

    save: async (items: T[]): Promise<void> => {
      try {
        await apiFetch(API_ENDPOINTS[endpoint], {
          method: 'PUT',
          body: JSON.stringify(items),
        });
      } catch (error) {
        console.error(`Error saving ${endpoint}:`, error);
      }
    },

    add: async (item: Omit<T, "id">): Promise<T> => {
      try {
        return await apiFetch<T>(API_ENDPOINTS[endpoint], {
          method: 'POST',
          body: JSON.stringify(item),
        });
      } catch (error) {
        console.error(`Error adding to ${endpoint}:`, error);
        throw error;
      }
    },

    update: async (id: string, item: Omit<T, "id">): Promise<void> => {
      try {
        await apiFetch(`${API_ENDPOINTS[endpoint]}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(item),
        });
      } catch (error) {
        console.error(`Error updating ${endpoint}:`, error);
        throw error;
      }
    },

    delete: async (id: string): Promise<void> => {
      try {
        await apiFetch(`${API_ENDPOINTS[endpoint]}/${id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error(`Error deleting from ${endpoint}:`, error);
        throw error;
      }
    }
  };

  return storage;
};

// Personal Info storage
export const personalInfoStorage = {
  get: async (): Promise<PersonalInfo> => {
    try {
      return await apiFetch<PersonalInfo>(API_ENDPOINTS.PERSONAL_INFO);
    } catch (error) {
      console.error('Error fetching personal info:', error);
      return mockPortfolioData.personalInfo;
    }
  },

  save: async (info: PersonalInfo): Promise<void> => {
    try {
      await apiFetch(API_ENDPOINTS.PERSONAL_INFO, {
        method: 'PUT',
        body: JSON.stringify(info),
      });
    } catch (error) {
      console.error('Error saving personal info:', error);
      throw error;
    }
  }
};

// Create storage instances for each data type
export const experienceStorage = createStorage<Experience>('EXPERIENCES', mockPortfolioData.experiences);
export const projectStorage = createStorage<Project>('PROJECTS', mockPortfolioData.projects);
export const skillStorage = createStorage<Skill>('SKILLS', mockPortfolioData.skills);
export const educationStorage = createStorage<Education>('EDUCATION', mockPortfolioData.education); 