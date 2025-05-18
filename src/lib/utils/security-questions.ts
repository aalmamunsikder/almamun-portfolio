import { SecurityQuestion, SecurityAnswer } from '@/types/auth';

export const SECURITY_QUESTIONS = [
  {
    id: 'first-pet',
    question: "What was the name of your first pet?"
  },
  {
    id: 'birth-city',
    question: "In which city were you born?"
  },
  {
    id: 'mother-maiden',
    question: "What is your mother's maiden name?"
  },
  {
    id: 'elementary-school',
    question: "What was the name of your elementary school?"
  },
  {
    id: 'first-car',
    question: "What was the make and model of your first car?"
  }
];

// Default questions and answers for development/testing
export const DEFAULT_QUESTIONS = ['first-pet', 'birth-city', 'mother-maiden'];
export const SECURITY_ANSWERS = {
  'first-pet': 'Fluffy',
  'birth-city': 'New York',
  'mother-maiden': 'Smith'
};

const STORAGE_KEY = 'security_questions';

export const saveSecurityQuestions = (questions: string[], answers: SecurityAnswer[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ questions, answers }));
};

export const getSecurityQuestions = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      questions: DEFAULT_QUESTIONS,
      answers: Object.entries(SECURITY_ANSWERS).map(([questionId, answer]) => ({
        questionId,
        answer
      }))
    };
  }
  return JSON.parse(stored);
};

export const hasSecurityQuestionsSet = (): boolean => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};

export const validateSecurityAnswer = (questionId: string, answer: string): boolean => {
  const { answers } = getSecurityQuestions();
  const storedAnswer = answers.find(a => a.questionId === questionId);
  return storedAnswer?.answer.toLowerCase() === answer.toLowerCase();
};

export const getRandomSecurityQuestion = (): SecurityQuestion | null => {
  try {
    const randomIndex = Math.floor(Math.random() * DEFAULT_QUESTIONS.length);
    const questionId = DEFAULT_QUESTIONS[randomIndex];
    const question = SECURITY_QUESTIONS.find(q => q.id === questionId);
    
    console.log('Getting random question:', {
      questionId,
      question
    });
    
    return question || null;
  } catch (error) {
    console.error('Error getting random question:', error);
    return null;
  }
}; 