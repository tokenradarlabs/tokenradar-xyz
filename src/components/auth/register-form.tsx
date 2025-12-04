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
import { registerFormSchema, type RegisterFormData } from '@/lib/schemas/auth';
import { sanitizeInput } from '@/utils/validation';
import { useFormHandler } from '@/lib/hooks/useFormHandler';
import PasswordStrength from '@/components/ui/password-strength';

export function RegisterForm() {
  const { form, handleSubmit, isSubmitting } = useFormHandler<RegisterFormData>(
    {
      schema: registerFormSchema,
      defaultValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      onSubmit: async (values: RegisterFormData) => {
        // Sanitize inputs before processing
        const sanitizedValues = {
          name: sanitizeInput(values.name),
          email: sanitizeInput(values.email),
          password: sanitizeInput(values.password),
          confirmPassword: sanitizeInput(values.confirmPassword),
        };

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Simulate successful registration
        const result = { ok: true, message: 'Account created successfully!' };

        if (!result.ok) {
          throw new Error(
            result.message || 'Registration failed. Please try again.'
          );
        }
      },
      successMessage: 'Account created successfully!',
      errorMessage:
        'An unexpected error occurred during registration. Please try again.',
    }
  );

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-center text-2xl font-bold'>
          Create Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormFieldLayout>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your full name'
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormFieldLayout>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormFieldLayout>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your email'
                        type='email'
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
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
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <PasswordStrength password={form.watch('password')} />
                  </FormFieldLayout>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormFieldLayout>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Confirm your password'
                        type='password'
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormFieldLayout>
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
