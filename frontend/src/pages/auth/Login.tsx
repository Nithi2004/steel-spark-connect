
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loginAndRedirect, loginWithSupabase } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Try primary login method first
      const success = await loginAndRedirect(data.email, data.password);
      
      if (!success) {
        // If primary method fails, try direct Supabase login as fallback
        console.log('Trying direct Supabase login as fallback');
        
        try {
          await loginWithSupabase(data.email, data.password);
          toast.success('Login successful!');
          
          // Redirect based on email domain
          const isAdmin = data.email.endsWith('@sssteelindia.com');
          window.location.href = isAdmin ? '/admin/dashboard' : '/customer/dashboard';
        } catch (supabaseError) {
          console.error('Direct Supabase login failed:', supabaseError);
          toast.error('Login failed. Please check your credentials.');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error?.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-steelgray-100 flex flex-col justify-center py-12">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-steelblue-900">Login</h1>
            <p className="text-steelgray-600 mt-2">
              Sign in to your account to access exclusive features
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} className="form-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="form-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-steelgray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-steelblue-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
