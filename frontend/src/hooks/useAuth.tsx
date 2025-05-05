import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  // Add other user properties as needed
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post<{
        token: string;
        user: User;
      }>('http://localhost:5000/api/auth/login', { email, password });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      context.setUser(user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post<{
        token: string;
        user: User;
      }>('http://localhost:5000/api/auth/register', { name, email, password });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      context.setUser(user);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    context.setUser(null);
    navigate('/login');
  };

  const loginAndRedirect = async (
    email: string,
    password: string,
    redirectPath?: string
  ): Promise<boolean> => {
    const success = await login(email, password);
    if (success) {
      const destination = context.user?.isAdmin 
        ? '/admin/dashboard' 
        : redirectPath || '/';
      navigate(destination);
      return true;
    }
    return false;
  };

  const registerAndRedirect = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    const success = await register(name, email, password);
    if (success) {
      navigate('/');
      return true;
    }
    return false;
  };

  return {
    user: context.user,
    isAdmin: context.user?.isAdmin || false,
    login,
    logout,
    register,
    loginAndRedirect,
    registerAndRedirect,
  };
};