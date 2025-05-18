import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Lock, Shield, AlertCircle, Calculator, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getRandomSecurityQuestion, validateSecurityAnswer, hasSecurityQuestionsSet } from '@/lib/utils/security-questions';
import { generateMathQuestion } from '@/lib/utils/math-verification';

const Login = () => {
  const [step, setStep] = useState<'math' | 'security' | 'password'>('math');
  const [password, setPassword] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [mathAnswer, setMathAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{ id: string; question: string } | null>(null);
  const [mathQuestion, setMathQuestion] = useState<{ question: string; answer: number } | null>(null);
  const [isSecurityVerified, setIsSecurityVerified] = useState(false);
  const [isMathVerified, setIsMathVerified] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Generate math question and security question on mount
  useEffect(() => {
    setMathQuestion(generateMathQuestion());
    const question = getRandomSecurityQuestion();
    setCurrentQuestion(question);
  }, []);

  const handleMathSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!mathQuestion) {
        throw new Error('No math question available');
      }

      const userAnswer = parseInt(mathAnswer, 10);
      if (isNaN(userAnswer)) {
        toast({
          title: "Invalid Answer",
          description: "Please enter a valid number",
          variant: "destructive",
        });
        return;
      }

      if (userAnswer === mathQuestion.answer) {
        setIsMathVerified(true);
        setStep('security');
        setMathAnswer('');
        toast({
          title: "Math Verification Passed",
          description: "Please answer your security question",
        });
      } else {
        toast({
          title: "Incorrect Answer",
          description: "Please try again with a new question",
          variant: "destructive",
        });
        // Generate new math question
        setMathQuestion(generateMathQuestion());
        setMathAnswer('');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during verification",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!currentQuestion || !isMathVerified) {
        throw new Error('Invalid login state');
      }

      const isValid = validateSecurityAnswer(currentQuestion.id, securityAnswer);
      
      if (isValid) {
        setIsSecurityVerified(true);
        setStep('password');
        setSecurityAnswer('');
        toast({
          title: "Security Question Verified",
          description: "Please enter your password",
        });
      } else {
        toast({
          title: "Verification failed",
          description: "Incorrect answer to security question",
          variant: "destructive",
        });
        // Get a new question
        const newQuestion = getRandomSecurityQuestion();
        setCurrentQuestion(newQuestion);
        setSecurityAnswer('');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during verification",
        variant: "destructive",
      });
      resetLoginProcess();
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!isSecurityVerified || !isMathVerified) {
        throw new Error('Invalid login state');
      }

      const success = await login(password);
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid password",
          variant: "destructive",
        });
        resetLoginProcess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
      resetLoginProcess();
    } finally {
      setIsLoading(false);
    }
  };

  const resetLoginProcess = () => {
    setStep('math');
    setIsMathVerified(false);
    setIsSecurityVerified(false);
    setMathAnswer('');
    setSecurityAnswer('');
    setPassword('');
    setMathQuestion(generateMathQuestion());
    const newQuestion = getRandomSecurityQuestion();
    setCurrentQuestion(newQuestion);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-theme-purple/20 to-blue-500/20 rounded-2xl blur-xl opacity-60 -z-10"></div>
        
        <div className="glass-morphism rounded-2xl p-8 md:p-12 border border-white/10 w-full max-w-md">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'math' ? 'bg-theme-purple' : isMathVerified ? 'bg-green-500' : 'bg-theme-purple/20'
              }`}>
                <Calculator className={`w-4 h-4 ${step === 'math' || isMathVerified ? 'text-white' : 'text-theme-purple'}`} />
              </div>
              <div className={`h-1 w-8 ${isMathVerified ? 'bg-green-500' : 'bg-white/10'}`} />
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'security' ? 'bg-theme-purple' : isSecurityVerified ? 'bg-green-500' : 'bg-theme-purple/20'
              }`}>
                <Shield className={`w-4 h-4 ${step === 'security' || isSecurityVerified ? 'text-white' : 'text-theme-purple'}`} />
              </div>
              <div className={`h-1 w-8 ${isSecurityVerified ? 'bg-green-500' : 'bg-white/10'}`} />
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'password' ? 'bg-theme-purple' : 'bg-theme-purple/20'
              }`}>
                <Lock className={`w-4 h-4 ${step === 'password' ? 'text-white' : 'text-theme-purple'}`} />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-tech text-gradient mb-2">
              {step === 'math' ? 'Step 1: Verify Human' : 
               step === 'security' ? 'Step 2: Security Check' : 
               'Step 3: Password'}
            </h1>
            <p className="text-white/70 font-tech">
              {step === 'math' ? 'Solve this simple math problem' :
               step === 'security' ? 'Answer your security question' :
               'Enter your password to complete login'}
            </p>
          </div>

          {step === 'math' && mathQuestion && (
            <form onSubmit={handleMathSubmit} className="space-y-6">
              <div className="p-6 rounded-xl bg-theme-purple/10 border border-theme-purple/20 text-center">
                <Brain className="w-8 h-8 text-theme-purple mx-auto mb-4" />
                <p className="text-xl font-tech text-white/90">{mathQuestion.question}</p>
              </div>
              
              <div>
                <label htmlFor="mathAnswer" className="block text-white/80 font-tech mb-2">
                  Your Answer
                </label>
                <input
                  type="number"
                  id="mathAnswer"
                  value={mathAnswer}
                  onChange={(e) => setMathAnswer(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-theme-purple/50 text-white font-tech"
                  placeholder="Enter your answer"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white rounded-xl py-4 font-tech transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Verify Answer'}
              </Button>
            </form>
          )}

          {step === 'security' && currentQuestion && (
            <form onSubmit={handleSecuritySubmit} className="space-y-6">
              <div className="p-4 rounded-xl bg-theme-purple/10 border border-theme-purple/20">
                <p className="text-white/90 font-tech">{currentQuestion.question}</p>
              </div>
              
              <div>
                <label htmlFor="answer" className="block text-white/80 font-tech mb-2">
                  Your Answer
                </label>
                <input
                  type="text"
                  id="answer"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-theme-purple/50 text-white font-tech"
                  placeholder="Enter your answer"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white rounded-xl py-4 font-tech transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Continue to Password'}
              </Button>

              <button
                type="button"
                onClick={resetLoginProcess}
                className="w-full text-white/50 hover:text-white text-sm font-tech"
              >
                ← Start Over
              </button>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-white/80 font-tech mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-theme-purple/50 text-white font-tech"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white rounded-xl py-4 font-tech transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Complete Login'}
              </Button>

              <button
                type="button"
                onClick={resetLoginProcess}
                className="w-full text-white/50 hover:text-white text-sm font-tech"
              >
                ← Start Over
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login; 