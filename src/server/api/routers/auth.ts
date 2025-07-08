import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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

      // Create user - temporarily store plain password
      // TODO: PR #2 - Add password hashing
      // TODO: PR #3 - Update schema to properly store password
      const user = await ctx.db.user.create({
        data: {
          email,
          // For now, we'll create a basic account without password
          // This will be updated in PR #3 with proper schema
          accounts: {
            create: {
              type: "credentials",
              provider: "credentials",
              providerAccountId: email,
            },
          },
        },
      });

      return { success: true, userId: user.id };
    }),
}); 