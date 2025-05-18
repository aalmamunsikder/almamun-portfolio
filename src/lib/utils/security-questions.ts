import { SecurityQuestion, SecurityAnswer } from '@/types/auth';

export const SECURITY_QUESTIONS: SecurityQuestion[] = [
  { id: 'birth', question: 'What city were you born in?' },
  { id: 'pet', question: 'What was your first pet\'s name?' },
  { id: 'school', question: 'What was the name of your first school?' },
  { id: 'car', question: 'What was your first car\'s model?' },
  { id: 'friend', question: 'Who was your best friend in childhood?' },
  { id: 'food', question: 'What is your favorite childhood food?' },
  { id: 'teacher', question: 'What was your favorite teacher\'s name?' },
  { id: 'book', question: 'What was your favorite book as a child?' },
  { id: 'movie', question: 'What was the first movie you saw in a theater?' },
  { id: 'street', question: 'What street did you grow up on?' }
];

// Default security questions and answers
const DEFAULT_QUESTIONS = ['birth', 'pet', 'school'];
const SECURITY_ANSWERS = {
  birth: 'dhaka',
  pet: 'tommy',
  school: 'abc school'
};

export const validateSecurityAnswer = (questionId: string, answer: string): boolean => {
  try {
    const correctAnswer = SECURITY_ANSWERS[questionId as keyof typeof SECURITY_ANSWERS];
    if (!correctAnswer) return false;
    
    const normalizedInput = answer.toLowerCase().trim();
    const isValid = normalizedInput === correctAnswer;
    
    console.log('Security validation:', {
      questionId,
      providedAnswer: normalizedInput,
      correctAnswer,
      isValid
    });
    
    return isValid;
  } catch (error) {
    console.error('Error validating security answer:', error);
    return false;
  }
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

export const hasSecurityQuestionsSet = (): boolean => {
  return true; // Always return true since we're using hardcoded questions
};

// These functions are no longer needed but kept for type compatibility
export const initializeSecurityQuestions = (): void => {};
export const saveSecurityQuestions = (selectedQuestions: string[], answers: SecurityAnswer[]): void => {};
export const getSecurityQuestions = (): { questions: string[], answers: SecurityAnswer[] } => {
  return {
    questions: DEFAULT_QUESTIONS,
    answers: Object.entries(SECURITY_ANSWERS).map(([questionId, answer]) => ({
      questionId,
      answer: btoa(answer)
    }))
  };
}; 