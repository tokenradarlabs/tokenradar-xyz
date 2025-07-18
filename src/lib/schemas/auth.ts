import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>; 