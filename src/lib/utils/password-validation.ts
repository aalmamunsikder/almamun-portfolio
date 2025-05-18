interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = [];

  // Check minimum length
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  // Check for numbers
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  // Check for special characters
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  // Check for common patterns
  const commonPatterns = [
    '123456', 'password', 'qwerty', 'admin', 'letmein',
    'welcome', '123123', '12345678', 'abc123'
  ];

  if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
    errors.push("Password contains a common pattern that is easily guessable");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const generatePasswordStrengthMessage = (password: string): string => {
  const { errors } = validatePassword(password);
  
  if (errors.length === 0) {
    if (password.length >= 12) {
      return "Strong password! 💪";
    }
    return "Good password! You can make it stronger by adding more characters";
  }

  return "Weak password - see requirements below";
}; 