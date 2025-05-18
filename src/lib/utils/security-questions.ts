export interface SecurityQuestion {
  id: string;
  question: string;
}

export interface SecurityAnswer {
  questionId: string;
  answer: string;
}

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

export const saveSecurityQuestions = (selectedQuestions: string[], answers: SecurityAnswer[]): void => {
  try {
    localStorage.setItem('securityQuestions', JSON.stringify({
      questions: selectedQuestions,
      answers: answers.map(a => ({ 
        questionId: a.questionId, 
        answer: btoa(a.answer.toLowerCase().trim()) 
      }))
    }));
  } catch (error) {
    console.error('Failed to save security questions:', error);
    throw new Error('Failed to save security questions');
  }
};

export const getSecurityQuestions = (): { questions: string[], answers: SecurityAnswer[] } => {
  try {
    const data = localStorage.getItem('securityQuestions');
    if (!data) {
      return { questions: [], answers: [] };
    }
    return JSON.parse(data);
  } catch {
    return { questions: [], answers: [] };
  }
};

export const validateSecurityAnswer = (questionId: string, answer: string): boolean => {
  try {
    const { answers } = getSecurityQuestions();
    const storedAnswer = answers.find(a => a.questionId === questionId);
    if (!storedAnswer) return false;
    
    return btoa(answer.toLowerCase().trim()) === storedAnswer.answer;
  } catch {
    return false;
  }
};

export const hasSecurityQuestionsSet = (): boolean => {
  const { questions, answers } = getSecurityQuestions();
  return questions.length >= 3 && answers.length >= 3;
};

export const getRandomSecurityQuestion = (): SecurityQuestion | null => {
  const { questions } = getSecurityQuestions();
  if (questions.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * questions.length);
  const questionId = questions[randomIndex];
  return SECURITY_QUESTIONS.find(q => q.id === questionId) || null;
}; 