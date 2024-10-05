import { z } from "zod";
import { apiResponseSchema } from "./apiResponse";
import { userSchema } from "./user";

export const loginSchema = z.object({
  user: userSchema.omit({ password: true }),
  token: z.string(),
  refreshToken: z.string(),
});
export const loginResponseSchema = apiResponseSchema(loginSchema);

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const signupSchema = z.object({
  user: userSchema.omit({ password: true }),
  token: z.string(),
  refreshToken: z.string(),
});
export const signupResponseSchema = apiResponseSchema(signupSchema);
