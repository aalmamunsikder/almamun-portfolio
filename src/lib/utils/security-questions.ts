import { SecurityQuestion, SecurityAnswer } from '@/types/auth';

export const SECURITY_QUESTIONS: SecurityQuestion[] = [
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

// Storage keys
const QUESTIONS_KEY = 'security_questions';
const ANSWERS_KEY = 'security_answers';

// Default questions and answers for development/testing
export const DEFAULT_QUESTIONS = ['first-pet', 'birth-city', 'mother-maiden'];
export const SECURITY_ANSWERS = {
  'first-pet': 'Fluffy',
  'birth-city': 'New York',
  'mother-maiden': 'Smith'
};

export const saveSecurityQuestions = (questions: string[], answers: SecurityAnswer[]): void => {
  try {
    // Store questions and answers separately for better security
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
    
    console.log('Security questions saved:', {
      questions,
      answersCount: answers.length
    });
  } catch (error) {
    console.error('Error saving security questions:', error);
    throw error;
  }
};

export const getSecurityQuestions = (): { questions: string[], answers: SecurityAnswer[] } => {
  try {
    const storedQuestions = localStorage.getItem(QUESTIONS_KEY);
    const storedAnswers = localStorage.getItem(ANSWERS_KEY);
    
    if (!storedQuestions || !storedAnswers) {
      // Return defaults if nothing is stored
      return {
        questions: DEFAULT_QUESTIONS,
        answers: Object.entries(SECURITY_ANSWERS).map(([questionId, answer]) => ({
          questionId,
          answer
        }))
      };
    }

    return {
      questions: JSON.parse(storedQuestions),
      answers: JSON.parse(storedAnswers)
    };
  } catch (error) {
    console.error('Error getting security questions:', error);
    // Return defaults on error
    return {
      questions: DEFAULT_QUESTIONS,
      answers: Object.entries(SECURITY_ANSWERS).map(([questionId, answer]) => ({
        questionId,
        answer
      }))
    };
  }
};

export const hasSecurityQuestionsSet = (): boolean => {
  try {
    return localStorage.getItem(QUESTIONS_KEY) !== null && 
           localStorage.getItem(ANSWERS_KEY) !== null;
  } catch (error) {
    console.error('Error checking security questions:', error);
    return false;
  }
};

export const validateSecurityAnswer = (questionId: string, answer: string): boolean => {
  try {
    const { answers } = getSecurityQuestions();
    const storedAnswer = answers.find(a => a.questionId === questionId);
    
    if (!storedAnswer) {
      console.error('No stored answer found for question:', questionId);
      return false;
    }

    const isValid = storedAnswer.answer.toLowerCase().trim() === answer.toLowerCase().trim();
    
    console.log('Security answer validation:', {
      questionId,
      isValid,
      providedAnswer: answer.toLowerCase().trim()
    });

    return isValid;
  } catch (error) {
    console.error('Error validating security answer:', error);
    return false;
  }
};

export const getRandomSecurityQuestion = (): SecurityQuestion | null => {
  try {
    const { questions } = getSecurityQuestions();
    if (questions.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * questions.length);
    const questionId = questions[randomIndex];
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