import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3),
  email: z.string().email().trim(),
  fullname: z.string().min(3),
  password: z.string().min(8),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const resetPasswordSchema = z
  .object({
    token: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    path: ["password2"],
    message: "Passwords do not match",
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
