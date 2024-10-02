import { z } from "zod";
import { LOGIN, LoginAction } from "../auth-content.constants";

export const authFormSchema = (action: LoginAction) =>
  z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Please enter a valid email",
      }),
    password:
      action === LOGIN
        ? z
            .string({
              required_error: "Password is required",
            })
            .min(6, {
              message: "Password must be at least 6 characters",
            })
            .regex(/\d/, {
              message: "Password must include at least one numeric character",
            })
            .regex(/[a-zA-Z]/, {
              message: "Password must include at least one letter character",
            })
        : z.string({
            required_error: "Password is required",
          }),
  });

export type AuthFormValues = z.infer<ReturnType<typeof authFormSchema>>;
