import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  fullname: z.string().min(3),
  password: z.string().min(8),
});

export const updateUserSchema = createUserSchema
  .extend({
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    address: z.string().optional(),
    roles: z.enum(["admin", "customer"]).optional(),
  })
  .omit({ password: true });

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
