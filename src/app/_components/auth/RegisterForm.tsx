"use client";

import { useState } from "react";
import { z } from "zod";

const emailSchema = z.string().email("Invalid email format");
const passwordSchema = z.string().min(8, "Password must be at least 8 characters");

const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<keyof RegisterFormData, string | null>>({
    email: null,
    password: null,
  });
  const [touched, setTouched] = useState<Record<keyof RegisterFormData, boolean>>({
    email: false,
    password: false,
  });

  const validateField = (name: keyof RegisterFormData, value: string) => {
    try {
      if (name === "email") {
        emailSchema.parse(value);
        setErrors(prev => ({ ...prev, [name]: null }));
      } else if (name === "password") {
        passwordSchema.parse(value);
        setErrors(prev => ({ ...prev, [name]: null }));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = error.errors[0]?.message || `Invalid ${name}`;
        setErrors(prev => ({
          ...prev,
          [name]: message,
        }));
      }
    }
  };

  const validateForm = () => {
    try {
      registerSchema.parse(formData);
      setErrors({
        email: null,
        password: null,
      });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<keyof RegisterFormData, string | null> = {
          email: null,
          password: null,
        };
        error.errors.forEach((err) => {
          if (err.path[0]) {
            const field = err.path[0] as keyof RegisterFormData;
            newErrors[field] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched on submit
    setTouched({
      email: true,
      password: true,
    });
    if (validateForm()) {
      // TODO: Implement registration logic
      console.log("Form submitted:", formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof RegisterFormData;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    
    // Validate field if it's been touched
    if (touched[fieldName]) {
      validateField(fieldName, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const fieldName = name as keyof RegisterFormData;
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
    validateField(fieldName, formData[fieldName]);
  };

  const getInputClassName = (fieldName: keyof RegisterFormData) => {
    const baseClasses = "mt-1 block w-full rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none";
    const validClasses = "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
    const errorClasses = "border-red-300 focus:border-red-500 focus:ring-red-500";
    
    return `${baseClasses} ${touched[fieldName] && errors[fieldName] ? errorClasses : validClasses}`;
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName("email")}
            required
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName("password")}
            required
          />
          {touched.password && errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>
    </div>
  );
} 