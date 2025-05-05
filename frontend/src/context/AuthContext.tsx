
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'customer';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  mobile?: string;
  createdAt?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, mobile?: string) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAdmin: false,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  refreshUser: async () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Initialize auth state from storage
  const initializeAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        // Verify token with backend in production
        if (import.meta.env.PROD) {
          const response = await axios.get(`${API_BASE_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
        } else {
          // In development, just use stored user
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      
      // Determine role based on email domain
      const role = email.endsWith('@sssteelindia.com') ? 'admin' : 'customer';
      
      // Update user with role information
      const updatedUser = { ...user, role };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast.success(`Welcome back, ${updatedUser.name}!`);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    mobile?: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Determine role based on email domain
      const role = email.endsWith('@sssteelindia.com') ? 'admin' : 'customer';
      
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
        mobile,
        role, // Include role in registration
      });

      const { token, user } = response.data;
      
      // Ensure the user object includes role
      const updatedUser = { ...user, role };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast.success('Registration successful! Welcome!');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.info('You have been logged out');
    navigate('/login');
  }, [navigate]);

  const refreshUser = async (): Promise<void> => {
    if (!user) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const updatedUser = response.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      // If refresh fails, log the user out
      logout();
    }
  };

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin,
        isAuthenticated,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
