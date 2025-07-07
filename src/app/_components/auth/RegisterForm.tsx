"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

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
import { api } from "@/trpc/react";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerMutation = api.auth.register.useMutation({
    onSuccess: () => {
      toast.success("Registration successful!");
      // Clear the form
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function onSubmit(values: FormData) {
    registerMutation.mutate(values);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      {...field} 
                      onBlur={field.onBlur}
                      disabled={registerMutation.isPending}
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
                      {...field}
                      onBlur={field.onBlur}
                      disabled={registerMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={!form.formState.isValid || registerMutation.isPending}
            >
              {registerMutation.isPending ? "Registering..." : "Register"}
            </Button>
            {registerMutation.isSuccess && (
              <p className="text-center text-green-600 mt-4">
                Successfully registered! ✅
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 