// hooks/useAuth.ts
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const useAuth = () => {
    const navigate = useNavigate();
  const registerAndRedirect = async (name: string, email: string, password: string) => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        mobile: '', // Pass mobile if needed
      });
      window.location.href = '/login';
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const loginAndRedirect = async (email: string, password: string, redirectPath: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const user = response.data.user;

      // Store user data in localStorage (or context if you're using one)
      localStorage.setItem('user', JSON.stringify(user));

      navigate(redirectPath);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      alert(message);
      throw new Error(message);
    }
  };
  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return { loginAndRedirect,logout,registerAndRedirect};
};
