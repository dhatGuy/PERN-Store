import { z } from "zod";
import { paginatedApiResponseSchema } from "./apiResponse";
export const productSchema = z.object({
  createdAt: z.string(),
  description: z.string(),
  id: z.number(),
  imageUrl: z.string(),
  name: z.string(),
  price: z.number(),
  slug: z.string(),
  updatedAt: z.string(),
  reviewCount: z.number().default(0),
  avgRating: z.number().default(0),
});

export type Product = z.infer<typeof productSchema>;

export const paginatedProductsSchema = paginatedApiResponseSchema(productSchema).strict();

export type PaginatedProducts = z.infer<typeof paginatedProductsSchema>;
