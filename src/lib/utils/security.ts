export interface LoginAttempt {
  timestamp: number;
  ip: string;
  success: boolean;
}

export interface LoginSession {
  id: string;
  startTime: number;
  lastActivity: number;
  userAgent: string;
  isCurrentSession: boolean;
}

// Maximum number of stored login attempts
export const MAX_LOGIN_ATTEMPTS_HISTORY = 50;
// Maximum number of active sessions
const MAX_ACTIVE_SESSIONS = 3;
// Session timeout in milliseconds (8 hours)
export const SESSION_TIMEOUT = 8 * 60 * 60 * 1000;

export const recordLoginAttempt = (success: boolean): void => {
  try {
    // Get existing attempts and ensure it's an array
    let attempts: LoginAttempt[] = [];
    const storedAttempts = localStorage.getItem('loginAttempts');
    
    if (storedAttempts) {
      try {
        const parsed = JSON.parse(storedAttempts);
        attempts = Array.isArray(parsed) ? parsed : [];
      } catch {
        attempts = [];
      }
    }
    
    // Add new attempt
    const newAttempt: LoginAttempt = {
      timestamp: Date.now(),
      ip: 'local', // In a real app, this would come from the server
      success
    };
    
    // Add to beginning of array and limit size
    attempts = [newAttempt, ...attempts].slice(0, MAX_LOGIN_ATTEMPTS_HISTORY);
    
    localStorage.setItem('loginAttempts', JSON.stringify(attempts));
  } catch (error) {
    console.error('Failed to record login attempt:', error);
  }
};

export const getLoginHistory = (): LoginAttempt[] => {
  try {
    const storedAttempts = localStorage.getItem('loginAttempts');
    if (!storedAttempts) return [];
    
    const parsed = JSON.parse(storedAttempts);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const createSession = (): LoginSession => {
  const now = Date.now();
  return {
    id: Math.random().toString(36).substring(2),
    startTime: now,
    lastActivity: now,
    userAgent: navigator.userAgent,
    isCurrentSession: true
  };
};

export const getActiveSessions = (): LoginSession[] => {
  try {
    const storedSessions = localStorage.getItem('activeSessions');
    if (!storedSessions) return [];
    
    const parsed = JSON.parse(storedSessions);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const updateSessionActivity = (sessionId: string): void => {
  try {
    const sessions = getActiveSessions();
    const updatedSessions = sessions.map(session => 
      session.id === sessionId 
        ? { ...session, lastActivity: Date.now() }
        : session
    );
    localStorage.setItem('activeSessions', JSON.stringify(updatedSessions));
  } catch (error) {
    console.error('Failed to update session activity:', error);
  }
};

export const terminateSession = (sessionId: string): void => {
  try {
    const sessions = getActiveSessions();
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    localStorage.setItem('activeSessions', JSON.stringify(updatedSessions));
  } catch (error) {
    console.error('Failed to terminate session:', error);
  }
};

export const terminateAllOtherSessions = (): void => {
  try {
    const sessions = getActiveSessions();
    const currentSession = sessions.find(s => s.isCurrentSession);
    if (currentSession) {
      localStorage.setItem('activeSessions', JSON.stringify([currentSession]));
    }
  } catch (error) {
    console.error('Failed to terminate other sessions:', error);
  }
}; 