import { z } from "zod";

export const orderCreateSchema = z.object({
  cartId: z.number(),
  userId: z.string(),
  amount: z.number(),
  itemTotal: z.number(),
  paymentMethod: z.enum(["STRIPE", "PAYSTACK"]),
  paymentReference: z.string(),
});

export type OrderCreateInput = z.infer<typeof orderCreateSchema>;
