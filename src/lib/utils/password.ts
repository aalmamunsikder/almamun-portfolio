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

export const updatePassword = async (newPassword: string): Promise<void> => {
  try {
    // In a real application, this would make an API call to update the password
    // For now, we'll just simulate it with localStorage
    localStorage.setItem('admin_password', newPassword);
    console.log('Password updated successfully');
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export const resetPassword = (): void => {
  localStorage.removeItem('adminPassword');
}; 