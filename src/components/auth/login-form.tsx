"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginFormSchema, type LoginFormData } from "@/lib/schemas/auth";

export function LoginForm() {
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Validate on change
    criteriaMode: "all", // Show all validation criteria
  });

  async function onSubmit(values: LoginFormData) {
    setFormError(null); // Clear previous errors
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // TODO: replace authenticateUser with your real auth call (e.g. API client, next-auth, etc.)
      // For now, we'll simulate a successful authentication.
      const result = { ok: true, message: "Login successful" }; // await authenticateUser(values);

      if (!result || !result.ok) {
        // Display server-provided error message if available, otherwise a generic message
        setFormError(result?.message || 'Invalid credentials. Please try again.');
        return;
      }

      // Success path: continue with sign-in flow (redirect, set session, etc.)
      // console.log("Login successful:", values); // Removed to prevent logging sensitive information
    } catch (err) {
      console.error('Login error', err);
      setFormError('An unexpected error occurred. Please try again.');
    }

    // console.log("Form submitted:", values); // Removed to prevent logging sensitive information
    form.reset();
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {formError && (
              <p role="alert" aria-atomic="true" className="text-center text-red-600 text-sm">
                {formError}
              </p>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your email" 
                      type="email"
                      disabled={form.formState.isSubmitting}
                      error={!!form.formState.errors.email}
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        form.trigger("email");
                      }}
                    />
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
                    <Input 
                      placeholder="Enter your password" 
                      type="password"
                      disabled={form.formState.isSubmitting}
                      error={!!form.formState.errors.password}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.trigger("password");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                "Logging in..."
              ) : (
                "Login"
              )}
            </Button>
            {form.formState.isSubmitSuccessful && (
              <p className="text-center text-green-600">
                Successfully logged in! ✅
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 