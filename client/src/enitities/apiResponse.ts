import { z } from "zod";

const fieldErrorSchema = z
  .object({
    id: z.string(),
    error: z.string(),
  })
  .strict();
export const serverErrorSchema = z
  .object({
    status: z.literal("SERVER_ERROR"),
    message: z.string().optional(),
  })
  .strict();
export const notFoundSchema = z
  .object({
    status: z.literal("NOT_FOUND"),
    message: z.string().optional(),
  })
  .strict();
export const unauthorizedSchema = z.object({
  status: z.literal("UNAUTHORIZED"),
  message: z.string().optional(),
});
export function apiResponseSchema<T extends z.AnyZodObject | z.ZodTypeAny>(schema: T) {
  return z.object({
    status: z.enum(["OK", "FIELD_ERROR", "UNAUTHORIZED", "SERVER_ERROR", "NOT_FOUND"]),
    message: z.string(),
    data: schema,
    formFields: z.array(fieldErrorSchema).optional(),
  });
}

export function paginatedApiResponseSchema<T extends z.AnyZodObject>(schema: T) {
  return apiResponseSchema(
    z.object({
      items: z.array(schema),
      page: z.number().min(1),
      limit: z.number().min(1),
      total: z.number().min(1),
    })
  );
}
