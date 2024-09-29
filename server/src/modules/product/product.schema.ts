import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(3),
  price: z.number().min(0),
  category: z.string().min(3),
  description: z.string().min(3),
  image_url: z.string().min(3),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;

export const productUpdateSchema = productCreateSchema.partial();

export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
