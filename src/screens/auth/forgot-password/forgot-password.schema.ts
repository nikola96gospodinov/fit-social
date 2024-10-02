import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Please enter a valid email",
    }),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
