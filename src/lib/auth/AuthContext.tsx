import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  recordLoginAttempt, 
  createSession, 
  updateSessionActivity, 
  terminateSession,
  SESSION_TIMEOUT 
} from '@/lib/utils/security';
import { initializeSecurityQuestions } from '@/lib/utils/security-questions';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  updatePassword: (newPassword: string) => Promise<void>;
  validateCurrentPassword: (password: string) => Promise<boolean>;
  lastLoginTime: Date | null;
  loginAttempts: number;
  currentSessionId: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Constants
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastLoginTime, setLastLoginTime] = useState<Date | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<Date | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const lastLogin = localStorage.getItem('lastLoginTime');
    const attempts = localStorage.getItem('loginAttempts');
    const locked = localStorage.getItem('lockedUntil');
    const sessionId = localStorage.getItem('currentSessionId');

    // Initialize security questions
    initializeSecurityQuestions();

    if (token && sessionId) {
      const loginTime = lastLogin ? new Date(lastLogin) : null;
      // Check if the session is still valid
      if (loginTime && Date.now() - loginTime.getTime() < SESSION_TIMEOUT) {
        setIsAuthenticated(true);
        setLastLoginTime(loginTime);
        setCurrentSessionId(sessionId);
        // Update session activity
        updateSessionActivity(sessionId);
      } else {
        // Session expired
        handleLogout();
      }
    }

    if (attempts) setLoginAttempts(parseInt(attempts));
    if (locked) setLockedUntil(new Date(locked));
  }, []);

  // Check for account lockout
  const isAccountLocked = () => {
    if (!lockedUntil) return false;
    const now = new Date();
    if (now > lockedUntil) {
      // Lockout period expired
      setLockedUntil(null);
      setLoginAttempts(0);
      localStorage.removeItem('lockedUntil');
      localStorage.setItem('loginAttempts', '0');
      return false;
    }
    return true;
  };

  const handleLogout = () => {
    if (currentSessionId) {
      terminateSession(currentSessionId);
    }
    localStorage.removeItem('adminToken');
    localStorage.removeItem('lastLoginTime');
    localStorage.removeItem('currentSessionId');
    setIsAuthenticated(false);
    setLastLoginTime(null);
    setCurrentSessionId(null);
  };

  const login = async (password: string): Promise<boolean> => {
    // Check for account lockout
    if (isAccountLocked()) {
      const timeLeft = Math.ceil((lockedUntil!.getTime() - Date.now()) / 60000);
      toast({
        title: "Account Locked",
        description: `Too many failed attempts. Try again in ${timeLeft} minutes.`,
        variant: "destructive",
      });
      recordLoginAttempt(false);
      return false;
    }

    // Get stored password hash
    const storedPassword = localStorage.getItem('adminPassword') || 'eclipse-2024';

    if (password === storedPassword) {
      const now = new Date();
      const token = btoa(now.getTime().toString());
      const session = createSession();
      
      localStorage.setItem('adminToken', token);
      localStorage.setItem('lastLoginTime', now.toISOString());
      localStorage.setItem('loginAttempts', '0');
      localStorage.setItem('currentSessionId', session.id);
      
      setIsAuthenticated(true);
      setLastLoginTime(now);
      setLoginAttempts(0);
      setCurrentSessionId(session.id);
      
      recordLoginAttempt(true);
      return true;
    } else {
      // Handle failed login attempt
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem('loginAttempts', newAttempts.toString());
      recordLoginAttempt(false);

      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        const lockTime = new Date(Date.now() + LOCKOUT_DURATION);
        setLockedUntil(lockTime);
        localStorage.setItem('lockedUntil', lockTime.toISOString());
        toast({
          title: "Account Locked",
          description: "Too many failed attempts. Try again in 15 minutes.",
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const validateCurrentPassword = async (password: string): Promise<boolean> => {
    const storedPassword = localStorage.getItem('adminPassword') || 'eclipse-2024';
    return password === storedPassword;
  };

  const updatePassword = async (newPassword: string): Promise<void> => {
    try {
      localStorage.setItem('adminPassword', newPassword);
      toast({
        title: "Success",
        description: "Password updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Auto logout on session expiration
  useEffect(() => {
    if (lastLoginTime && currentSessionId) {
      const timeoutId = setTimeout(() => {
        handleLogout();
        toast({
          title: "Session Expired",
          description: "Please login again",
        });
      }, SESSION_TIMEOUT);

      return () => clearTimeout(timeoutId);
    }
  }, [lastLoginTime, currentSessionId]);

  // Update session activity periodically
  useEffect(() => {
    if (isAuthenticated && currentSessionId) {
      const intervalId = setInterval(() => {
        updateSessionActivity(currentSessionId);
      }, 5 * 60 * 1000); // Every 5 minutes

      return () => clearInterval(intervalId);
    }
  }, [isAuthenticated, currentSessionId]);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout: handleLogout,
      updatePassword,
      validateCurrentPassword,
      lastLoginTime,
      loginAttempts,
      currentSessionId,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 