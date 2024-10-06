import { z } from "zod";
import { apiResponseSchema } from "./apiResponse";
import { productSchema } from "./product";

export const cartSchema = z.object({
  createdAt: z.string(),
  id: z.number(),
  updatedAt: z.string(),
  userId: z.string(),
});

export type Cart = z.infer<typeof cartSchema>;

export const cartItemSchema = z.object({
  ...productSchema.omit({ avgRating: true, reviewCount: true }).shape,
  subtotal: z.number(),
  quantity: z.number().min(1),
});

export type CartItem = z.infer<typeof cartItemSchema>;

export const cartApiResponse = apiResponseSchema(z.array(cartItemSchema));
