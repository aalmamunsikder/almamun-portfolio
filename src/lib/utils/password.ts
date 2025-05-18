// Default admin password
export const DEFAULT_PASSWORD = 'eclipse-2024';

export const validatePassword = (password: string): boolean => {
  const storedPassword = localStorage.getItem('adminPassword') || DEFAULT_PASSWORD;
  console.log('Password validation:', {
    provided: password,
    stored: storedPassword,
    isValid: password === storedPassword
  });
  return password === storedPassword;
};

export const updatePassword = (newPassword: string): void => {
  localStorage.setItem('adminPassword', newPassword);
};

export const resetPassword = (): void => {
  localStorage.removeItem('adminPassword');
}; 