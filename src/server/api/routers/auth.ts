import { z } from "zod";
import { hash } from "bcryptjs";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const HASH_ROUNDS = 12; // Industry standard for bcrypt

const registerSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
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

      // Create user
      // Note: We're temporarily storing the hashed password in providerAccountId
      // This will be moved to a proper password field in the next PR
      const user = await ctx.db.user.create({
        data: {
          email,
          accounts: {
            create: {
              type: "credentials",
              provider: "credentials",
              providerAccountId: hashedPassword,
            },
          },
        },
      });

      return { success: true, userId: user.id };
    }),
}); 