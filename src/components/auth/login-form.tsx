'use client';

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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { loginFormSchema, type LoginFormData } from '@/lib/schemas/auth';
import { useFormHandler } from '@/lib/hooks/useFormHandler';
import { useState } from 'react';

const authenticateUser = async (values: LoginFormData) => {
  // Placeholder for actual authentication logic
  console.log('Authenticating user with values:', values);
  // Simulate a 429 error for demonstration purposes
  if (values.email === 'rate@limit.com') {
    return { ok: false, message: 'Too Many Requests', status: 429 };
  }
  // Simulate a successful login for now
  return { ok: true, message: 'Login successful' };
};

export function LoginForm() {
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const { form, handleSubmit, isSubmitting } = useFormHandler<LoginFormData>({
    schema: loginFormSchema,
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values: LoginFormData) => {
      setRateLimitError(null); // Clear any previous rate limit errors

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: replace authenticateUser with your real auth call (e.g. API client, next-auth, etc.)
      // For now, we'll simulate a successful authentication.
      const result = await authenticateUser(values);

      if (!result || !result.ok) {
        if (result?.status === 429) {
          setRateLimitError(
            'Too many login attempts. Please try again after some time.'
          );
          return; // Prevent further processing for rate limit error
        }
        throw new Error(
          result?.message || 'Invalid credentials. Please try again.'
        );
      }
      // Success path: continue with sign-in flow (redirect, set session, etc.)
    },
    successMessage: 'Login successful!',
    errorMessage:
      'An unexpected error occurred during login. Please try again.',
  });

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-center text-2xl font-bold'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your email'
                      type='email'
                      disabled={isSubmitting}
                      error={!!form.formState.errors.email}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your password'
                      type='password'
                      disabled={isSubmitting}
                      error={!!form.formState.errors.password}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {rateLimitError && (
              <Label className='text-destructive text-center'>
                {rateLimitError}
              </Label>
            )}
            <Button type='submit' className='w-full' disabled={isSubmitting || !!rateLimitError}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
