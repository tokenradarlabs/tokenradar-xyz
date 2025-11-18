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
import { loginFormSchema, type LoginFormData } from '@/lib/schemas/auth';
import { sanitizeInput } from '@/utils/validation';
import { useFormHandler } from '@/lib/hooks/useFormHandler';

const authenticateUser = async (values: LoginFormData) => {
  // Placeholder for actual authentication logic
  console.log('Authenticating user with values:', values);
  // Simulate a successful login for now
  return { ok: true, message: 'Login successful' };
};

export function LoginForm() {
  const { form, handleSubmit, isSubmitting } = useFormHandler<LoginFormData>({
    schema: loginFormSchema,
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values: LoginFormData) => {
      // Sanitize inputs before processing
      const sanitizedValues = {
        email: sanitizeInput(values.email),
        password: sanitizeInput(values.password),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: replace authenticateUser with your real auth call (e.g. API client, next-auth, etc.)
      // For now, we'll simulate a successful authentication.
      const result = await authenticateUser(sanitizedValues);

      if (!result || !result.ok) {
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
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
