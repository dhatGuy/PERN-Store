import { z } from "zod";

export const userSchema = z.object({
  address: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  createdAt: z.string(),
  email: z.string().email(),
  fullname: z.string(),
  googleId: z.string().nullable(),
  id: z.string(),
  password: z.string().nullable(),
  roles: z.enum(["admin", "customer"]).default("customer"),
  state: z.string().nullable(),
  updatedAt: z.string().transform((val) => new Date(val)),
  username: z.string(),
});

export type User = z.infer<typeof userSchema>;
