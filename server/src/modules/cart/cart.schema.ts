import { z } from "zod";

export const cartUpdateSchema = z.object({
  quantity: z.number().min(0),
  productId: z.number(),
  cartId: z.number().optional(),
  userId: z.string(),
});

export type CartUpdateSchema = z.infer<typeof cartUpdateSchema>;
