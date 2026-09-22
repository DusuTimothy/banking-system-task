const { z } = require("zod");

const searchQuerySchema = z.object({
  query: z.object({
    q: z
      .string({ required_error: "q query parameter is required" })
      .trim()
      .min(1, "q must not be empty")
      .max(100),
    limit: z
      .string()
      .regex(/^\d+$/, "limit must be a positive integer")
      .transform(Number)
      .refine((n) => n > 0 && n <= 50, "limit must be between 1 and 50")
      .optional(),
  }),
});

module.exports = { searchQuerySchema };
