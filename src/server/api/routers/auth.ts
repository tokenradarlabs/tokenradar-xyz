import { z } from "zod";
import { hash, compare } from "bcryptjs";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const HASH_ROUNDS = 12;

const registerSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      // Check if user already exists
      const existingUser = await ctx.db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with this email already exists",
        });
      }

      // Hash password with bcrypt
      const hashedPassword = await hash(password, HASH_ROUNDS);

      // Create user with proper password storage
      const user = await ctx.db.user.create({
        data: {
          email,
          accounts: {
            create: {
              type: "credentials",
              provider: "credentials",
              providerAccountId: email,
              password: hashedPassword,
            },
          },
        },
      });

      return { success: true, userId: user.id };
    }),

  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      // Find user by email
      const user = await ctx.db.user.findUnique({
        where: { email },
        include: {
          accounts: {
            where: {
              provider: "credentials",
              type: "credentials",
            },
          },
        },
      });

      if (!user || user.accounts.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No user found with this email",
        });
      }

      const account = user.accounts[0];

      if (!account || !account.password) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Invalid account configuration",
        });
      }

      // Verify password
      const isValid = await compare(password, account.password);

      if (!isValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password",
        });
      }

      // For now, just return success. JWT implementation will come in next PR
      return {
        success: true,
        userId: user.id,
      };
    }),
}); 