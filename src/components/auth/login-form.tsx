'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormFieldLayout,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { loginFormSchema, type LoginFormData } from '@/lib/schemas/auth';
import { useFormHandler } from '@/lib/hooks/useFormHandler';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDebounce } from '@/lib/hooks/useDebounce';

const authenticateUser = async (values: LoginFormData) => {
  // Placeholder for actual authentication logic
  console.log('Authenticating user with values:', values);

  // Simulate a successful login for now
  return { ok: true, message: 'Login successful' };
};

export function LoginForm() {
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [retryAfterSeconds, setRetryAfterSeconds] = useState<number>(0);
  const { form, handleSubmit, isSubmitting } = useFormHandler<LoginFormData>({
    schema: loginFormSchema,
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values: LoginFormData) => {
      setRateLimitError(null); // Clear any previous rate limit errors
      setRetryAfterSeconds(0);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: replace authenticateUser with your real auth call (e.g. API client, next-auth, etc.)
      // For now, we'll simulate a successful authentication.
      // Simulate a rate limit error for demonstration
      const result = {
        ok: false,
        status: 429,
        message: 'Too many login attempts.',
        retryAfter: 30,
      };
      // const result = await authenticateUser(values); // Uncomment this for real auth

      if (!result || !result.ok) {
        if (result?.status === 429) {
          const retryAfter = result.retryAfter || 60; // Default to 60 seconds if not provided
          setRetryAfterSeconds(retryAfter);
          setRateLimitError(
            `Too many login attempts. Please try again in ${retryAfter} seconds.`
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

  const [emailValidationStatus, setEmailValidationStatus] = useState<
    'idle' | 'validating' | 'valid' | 'invalid'
  >('idle');

  const emailValue = form.watch('email');
  const debouncedEmail = useDebounce(emailValue, 500);

  useEffect(() => {
    if (debouncedEmail.length === 0) {
      setEmailValidationStatus('idle');
      return;
    }

    setEmailValidationStatus('validating');
    const validateEmail = async () => {
      try {
        await loginFormSchema.pick({ email: true }).parseAsync({ email: debouncedEmail });
        setEmailValidationStatus('valid');
      } catch (error) {
        setEmailValidationStatus('invalid');
      }
    };
    validateEmail();
  }, [debouncedEmail]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (retryAfterSeconds > 0) {
      timerRef.current = setInterval(() => {
        setRetryAfterSeconds(prev => prev - 1);
      }, 1000);
    } else if (retryAfterSeconds === 0 && rateLimitError) {
      setRateLimitError(null);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [retryAfterSeconds, rateLimitError]);

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
                  <FormFieldLayout>
                    <FormLabel>Email</FormLabel>
                    <div className='relative'>
                      <FormControl>
                        <Input
                          placeholder='Enter your email'
                          type='email'
                          disabled={isSubmitting || retryAfterSeconds > 0}
                          {...field}
                        />
                      </FormControl>
                      {emailValidationStatus === 'validating' && (
                        <span className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                          <span className='h-5 w-5 text-gray-400 animate-spin'>●</span>
                        </span>
                      )}
                      {emailValidationStatus === 'valid' && (
                        <span className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                          <span className='h-5 w-5 text-green-500'>✓</span>
                        </span>
                      )}
                      {emailValidationStatus === 'invalid' && (
                        <span className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                          <span className='h-5 w-5 text-red-500'>✗</span>
                        </span>
                      )}
                    </div>
                    <FormMessage />
                  </FormFieldLayout>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormFieldLayout>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your password'
                        type='password'
                        disabled={isSubmitting || retryAfterSeconds > 0}
                        error={!!form.formState.errors.password}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormFieldLayout>
                </FormItem>
              )}
            />
            {rateLimitError && (
              <div
                role='alert'
                aria-live='assertive'
                className='text-center font-medium text-destructive-foreground p-3 rounded-md bg-destructive mt-4'
              >
                {retryAfterSeconds > 0
                  ? `Too many login attempts. Please try again in ${retryAfterSeconds} seconds.`
                  : rateLimitError}
              </div>
            )}
            <Button type='submit' className='w-full' disabled={isSubmitting || retryAfterSeconds > 0}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
