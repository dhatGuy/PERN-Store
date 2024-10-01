import { z } from "zod";

export const signupInputSchema = z
  .object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
    fullname: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    path: ["password2"],
    message: "Passwords do not match",
  });

export type SignupInput = z.infer<typeof signupInputSchema>;

export const loginInputSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
