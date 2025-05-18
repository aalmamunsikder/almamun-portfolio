import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Lock, 
  Shield, 
  Key, 
  AlertCircle, 
  CheckCircle2, 
  History, 
  Monitor, 
  XCircle,
  Clock,
  CheckCircle,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { validatePassword, generatePasswordStrengthMessage } from '@/lib/utils/password-validation';
import { 
  getActiveSessions, 
  getLoginHistory, 
  terminateSession, 
  terminateAllOtherSessions,
  LoginSession,
  LoginAttempt
} from '@/lib/utils/security';
import {
  SECURITY_QUESTIONS,
  SecurityAnswer,
  saveSecurityQuestions,
  getSecurityQuestions,
  hasSecurityQuestionsSet
} from '@/lib/utils/security-questions';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { updatePassword, validateCurrentPassword } = useAuth();
  const { toast } = useToast();
  const [activeSessions, setActiveSessions] = useState<LoginSession[]>([]);
  const [loginHistory, setLoginHistory] = useState<LoginAttempt[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [securityAnswers, setSecurityAnswers] = useState<SecurityAnswer[]>([]);
  const [isSettingQuestions, setIsSettingQuestions] = useState(false);

  // Update password strength and validation errors when password changes
  useEffect(() => {
    if (newPassword) {
      const { errors } = validatePassword(newPassword);
      setValidationErrors(errors);
      setPasswordStrength(generatePasswordStrengthMessage(newPassword));
    } else {
      setValidationErrors([]);
      setPasswordStrength('');
    }
  }, [newPassword]);

  // Load sessions and history
  useEffect(() => {
    const loadData = () => {
      try {
        const sessions = getActiveSessions();
        const history = getLoginHistory();
        
        setActiveSessions(sessions);
        setLoginHistory(history);
      } catch (error) {
        console.error('Error loading security data:', error);
        setActiveSessions([]);
        setLoginHistory([]);
      }
    };

    loadData();

    // Refresh data every minute
    const intervalId = setInterval(loadData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Load security questions
  useEffect(() => {
    const { questions, answers } = getSecurityQuestions();
    setSelectedQuestions(questions);
    setSecurityAnswers(answers);
  }, []);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate current password
      const isValid = await validateCurrentPassword(currentPassword);
      if (!isValid) {
        toast({
          title: "Error",
          description: "Current password is incorrect",
          variant: "destructive",
        });
        return;
      }

      // Validate new password
      const { isValid: isPasswordValid, errors } = validatePassword(newPassword);
      if (!isPasswordValid) {
        toast({
          title: "Error",
          description: "Password does not meet requirements",
          variant: "destructive",
        });
        setValidationErrors(errors);
        return;
      }

      if (newPassword !== confirmPassword) {
        toast({
          title: "Error",
          description: "New passwords do not match",
          variant: "destructive",
        });
        return;
      }

      // Update password
      await updatePassword(newPassword);
      
      toast({
        title: "Success",
        description: "Password updated successfully",
      });

      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setValidationErrors([]);
      setPasswordStrength('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTerminateSession = (sessionId: string) => {
    terminateSession(sessionId);
    setActiveSessions(getActiveSessions());
    toast({
      title: "Session Terminated",
      description: "The selected session has been terminated",
    });
  };

  const handleTerminateAllOtherSessions = () => {
    terminateAllOtherSessions();
    setActiveSessions(getActiveSessions());
    toast({
      title: "Sessions Terminated",
      description: "All other sessions have been terminated",
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const handleQuestionSelect = (questionId: string, index: number) => {
    const newSelected = [...selectedQuestions];
    newSelected[index] = questionId;
    setSelectedQuestions(newSelected);

    // Initialize answer if not exists
    if (!securityAnswers.find(a => a.questionId === questionId)) {
      setSecurityAnswers(prev => [...prev, { questionId, answer: '' }]);
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setSecurityAnswers(prev => 
      prev.map(a => a.questionId === questionId ? { ...a, answer } : a)
    );
  };

  const handleSaveQuestions = async () => {
    try {
      // Validate
      if (selectedQuestions.length < 3) {
        toast({
          title: "Error",
          description: "Please select at least 3 security questions",
          variant: "destructive",
        });
        return;
      }

      const unanswered = selectedQuestions.some(qId => 
        !securityAnswers.find(a => a.questionId === qId && a.answer.trim())
      );

      if (unanswered) {
        toast({
          title: "Error",
          description: "Please answer all selected questions",
          variant: "destructive",
        });
        return;
      }

      // Save questions
      saveSecurityQuestions(selectedQuestions, securityAnswers);
      
      toast({
        title: "Success",
        description: "Security questions updated successfully",
      });
      
      setIsSettingQuestions(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save security questions",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-tech text-white mb-2">Security Settings</h1>
        <p className="text-white/70">Manage your admin panel security settings</p>
      </div>

      <div className="space-y-6">
        {/* Password Management */}
        <div className="glass-morphism rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-theme-purple/20">
              <Lock className="h-5 w-5 text-theme-purple" />
            </div>
            <div>
              <h2 className="text-xl font-tech text-white">Password Management</h2>
              <p className="text-sm text-white/70">Update your admin password</p>
            </div>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-white/80 font-tech mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-theme-purple/50 text-white font-tech"
                required
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-white/80 font-tech mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-theme-purple/50 text-white font-tech"
                required
              />
              {newPassword && (
                <div className={`mt-2 text-sm flex items-center gap-2 ${
                  validationErrors.length === 0 ? 'text-green-500' : 'text-yellow-500'
                }`}>
                  {validationErrors.length === 0 ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {passwordStrength}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-white/80 font-tech mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-theme-purple/50 text-white font-tech"
                required
              />
            </div>

            {validationErrors.length > 0 && (
              <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                <h3 className="text-yellow-500 font-tech mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Password Requirements
                </h3>
                <ul className="space-y-1 text-sm text-yellow-500/80">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || validationErrors.length > 0}
              className="w-full bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white rounded-xl py-4 font-tech transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </div>

        {/* Security Tips */}
        <div className="glass-morphism rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-theme-purple/20">
              <Shield className="h-5 w-5 text-theme-purple" />
            </div>
            <h2 className="text-xl font-tech text-white">Security Tips</h2>
          </div>
          
          <ul className="space-y-3 text-white/70">
            <li className="flex items-start gap-2">
              <Key className="h-5 w-5 mt-1 flex-shrink-0" />
              <span>Use a strong password with at least 8 characters, including numbers, symbols, and mixed case letters</span>
            </li>
            <li className="flex items-start gap-2">
              <Key className="h-5 w-5 mt-1 flex-shrink-0" />
              <span>Change your password regularly and never share it with anyone</span>
            </li>
            <li className="flex items-start gap-2">
              <Key className="h-5 w-5 mt-1 flex-shrink-0" />
              <span>Enable two-factor authentication when available for additional security</span>
            </li>
          </ul>
        </div>

        {/* Security Questions */}
        <div className="glass-morphism rounded-2xl p-6 border border-white/10 mt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-theme-purple/20">
                <Shield className="h-5 w-5 text-theme-purple" />
              </div>
              <div>
                <h2 className="text-xl font-tech text-white">Security Questions</h2>
                <p className="text-sm text-white/70">Set up recovery questions for your account</p>
              </div>
            </div>
            {!isSettingQuestions && (
              <Button
                onClick={() => setIsSettingQuestions(true)}
                variant="outline"
                className="border-theme-purple/50 text-theme-purple hover:bg-theme-purple/10"
              >
                {hasSecurityQuestionsSet() ? 'Update Questions' : 'Set Up Questions'}
              </Button>
            )}
          </div>

          {isSettingQuestions ? (
            <div className="space-y-6">
              <div className="space-y-4">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-white/80 font-tech">
                      Question {index + 1}
                    </label>
                    <select
                      value={selectedQuestions[index] || ''}
                      onChange={(e) => handleQuestionSelect(e.target.value, index)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-theme-purple/50 text-white font-tech"
                    >
                      <option value="">Select a question...</option>
                      {SECURITY_QUESTIONS.map((q) => (
                        <option
                          key={q.id}
                          value={q.id}
                          disabled={selectedQuestions.includes(q.id) && selectedQuestions.indexOf(q.id) !== index}
                        >
                          {q.question}
                        </option>
                      ))}
                    </select>
                    {selectedQuestions[index] && (
                      <input
                        type="text"
                        value={securityAnswers.find(a => a.questionId === selectedQuestions[index])?.answer || ''}
                        onChange={(e) => handleAnswerChange(selectedQuestions[index], e.target.value)}
                        placeholder="Your answer"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-theme-purple/50 text-white font-tech mt-2"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSaveQuestions}
                  className="flex-1 bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90"
                >
                  Save Questions
                </Button>
                <Button
                  onClick={() => setIsSettingQuestions(false)}
                  variant="outline"
                  className="border-white/10 text-white/70 hover:bg-white/5"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-white/70">
              {hasSecurityQuestionsSet() ? (
                <p>You have set up security questions for account recovery.</p>
              ) : (
                <p>Set up security questions to help recover your account if you forget your password.</p>
              )}
            </div>
          )}
        </div>

        {/* Active Sessions */}
        <div className="glass-morphism rounded-2xl p-6 border border-white/10 mt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-theme-purple/20">
                <Monitor className="h-5 w-5 text-theme-purple" />
              </div>
              <div>
                <h2 className="text-xl font-tech text-white">Active Sessions</h2>
                <p className="text-sm text-white/70">Manage your active login sessions</p>
              </div>
            </div>
            {activeSessions.length > 1 && (
              <Button
                onClick={handleTerminateAllOtherSessions}
                variant="destructive"
                className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Terminate Other Sessions
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    session.isCurrentSession ? 'bg-green-500/20' : 'bg-blue-500/20'
                  }`}>
                    <Monitor className={`h-5 w-5 ${
                      session.isCurrentSession ? 'text-green-500' : 'text-blue-500'
                    }`} />
                  </div>
                  <div>
                    <div className="font-tech text-white flex items-center gap-2">
                      {session.isCurrentSession ? 'Current Session' : 'Other Session'}
                      {session.isCurrentSession && (
                        <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/70 mt-1">
                      Started {formatTimeAgo(session.startTime)}
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      {session.userAgent}
                    </p>
                  </div>
                </div>
                {!session.isCurrentSession && (
                  <Button
                    onClick={() => handleTerminateSession(session.id)}
                    variant="ghost"
                    className="text-red-500 hover:text-red-400"
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Login History */}
        <div className="glass-morphism rounded-2xl p-6 border border-white/10 mt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-theme-purple/20">
              <History className="h-5 w-5 text-theme-purple" />
            </div>
            <div>
              <h2 className="text-xl font-tech text-white">Login History</h2>
              <p className="text-sm text-white/70">Recent login attempts</p>
            </div>
          </div>

          <div className="space-y-3">
            {loginHistory.map((attempt, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div className={`p-2 rounded-lg ${
                  attempt.success ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {attempt.success ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-tech text-white">
                      {attempt.success ? 'Successful Login' : 'Failed Attempt'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      attempt.success 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {attempt.success ? 'Success' : 'Failed'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-white/50">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(attempt.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {loginHistory.length === 0 && (
              <div className="text-center text-white/50 py-4">
                No login history available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 