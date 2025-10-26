import * as z from "zod";

/**
 * @typedef {object} LoginFormData - Type for login form data.
 * @property {string} email - User's email address.
 * @property {string} password - User's password.
 *
 * @example
 * const validLoginData = { email: "test@example.com", password: "Password123" };
 * const invalidLoginData = { email: "invalid", password: "short" };
 */
export const loginFormSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

/**
 * @typedef {z.infer<typeof loginFormSchema>} LoginFormData
 */
export type LoginFormData = z.infer<typeof loginFormSchema>;

/**
 * @typedef {object} RegisterFormData - Type for registration form data.
 * @property {string} name - User's full name.
 * @property {string} email - User's email address.
 * @property {string} password - User's password.
 * @property {string} confirmPassword - Confirmation of the user's password.
 *
 * @example
 * const validRegisterData = { name: "John Doe", email: "john@example.com", password: "Password123", confirmPassword: "Password123" };
 * const invalidRegisterData = { name: "", email: "invalid", password: "short", confirmPassword: "no" };
 */
export const registerFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required").email(),
  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

/**
 * @typedef {z.infer<typeof registerFormSchema>} RegisterFormData
 */
export type RegisterFormData = z.infer<typeof registerFormSchema>;

/**
 * Extracts error messages from a ZodSafeParseError.
 * @param {z.ZodError} error - The Zod error object.
 * @returns {Record<string, string>} An object mapping field names to their first error message.
 *
 * @example
 * const result = loginFormSchema.safeParse({});
 * if (!result.success) {
 *   const errors = getFormErrors(result.error);
 *   console.log(errors); // { email: "Email is required", password: "Password is required" }
 * }
 */
export function getFormErrors<T>(error: z.ZodError<T>): Record<string, string> {
  const errors: Record<string, string> = {};
  error.errors.forEach((err) => {
    if (err.path.length > 0) {
      errors[err.path[0]] = err.message;
    }
  });
  return errors;
}
