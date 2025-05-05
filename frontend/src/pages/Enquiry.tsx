
import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters long' }),
  mobile: z.string().regex(/^[6-9]\d{9}$/, { message: 'Enter a valid 10-digit mobile number' }),
  email: z.string().email({ message: 'Enter a valid email address' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters long' }),
  enquiry: z.string().min(10, { message: 'Enquiry details must be at least 10 characters long' }),
});

type FormValues = z.infer<typeof formSchema>;

const Enquiry = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      mobile: '',
      email: '',
      subject: '',
      enquiry: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call with a delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted with:', data);
      
      toast.success('Enquiry submitted successfully!', {
        description: 'Our team will get back to you shortly.',
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit enquiry', {
        description: 'Please try again later or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-steelblue-900 hero-gradient py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Enquiry</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Have questions about our products or services? Send us an enquiry and we'll get back to you soon.
          </p>
        </div>
      </section>
      
      {/* Enquiry Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-steelgray-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-steelblue-900">Send Us Your Enquiry</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} className="form-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} className="form-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="10-digit mobile number" {...field} className="form-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject*</FormLabel>
                        <FormControl>
                          <Input placeholder="Subject of your enquiry" {...field} className="form-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address*</FormLabel>
                      <FormControl>
                        <Input placeholder="Your complete address" {...field} className="form-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="enquiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enquiry Details*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide details about your enquiry"
                          className="form-input min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                </Button>
              </form>
            </Form>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-steelgray-700">
                Alternatively, you can reach us directly:
              </p>
              <div className="mt-2 space-y-1 text-steelblue-900">
                <p>Phone: +91 63820 85337, 87540 10925</p>
                <p>Email: <a href="mailto:sales@sssteelindia.com" className="text-steelblue-600 hover:underline">sales@sssteelindia.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Enquiry;
