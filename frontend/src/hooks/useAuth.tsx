
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, isAdmin, login, register, logout } = context;

  // Modified to directly use Supabase in case of context issues
  const loginWithSupabase = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return data.user;
    } catch (error) {
      console.error('Supabase login error:', error);
      throw error;
    }
  };

  const loginAndRedirect = async (
    email: string,
    password: string,
    redirectPath?: string
  ): Promise<boolean> => {
    try {
      const success = await login(email, password);
      
      if (success) {
        // Determine if user is admin based on email domain
        const isAdminUser = email.endsWith('@sssteelindia.com');
        const destination = isAdminUser 
          ? '/admin/dashboard' 
          : redirectPath || '/customer/dashboard';
        
        toast.success(`Welcome back${user?.name ? ', ' + user.name : ''}!`);
        navigate(destination);
        return true;
      }
      return false;
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error('Login error:', error);
      return false;
    }
  };

  const registerAndRedirect = async (
    name: string,
    email: string,
    password: string,
    mobile?: string
  ): Promise<boolean> => {
    try {
      const success = await register(name, email, password, mobile);
      if (success) {
        toast.success('Account created successfully!');
        // Determine if user is admin based on email domain
        const isAdminUser = email.endsWith('@sssteelindia.com');
        navigate(isAdminUser ? '/admin/dashboard' : '/customer/dashboard');
        return true;
      }
      return false;
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
      return false;
    }
  };

  return {
    user,
    isAdmin,
    login,
    loginWithSupabase,
    logout,
    register,
    loginAndRedirect,
    registerAndRedirect,
  };
};
