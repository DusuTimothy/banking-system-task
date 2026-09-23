const { z } = require("zod");

const adjustBalanceSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "user id is required" }).uuid("id must be a valid UUID"),
  }),
  body: z.object({
    amount: z
      .number({ required_error: "amount is required", invalid_type_error: "amount must be a number" })
      .positive("amount must be greater than 0")
      .max(1_000_000, "amount exceeds the maximum allowed"),
    operation: z.enum(["add", "reduce"], {
      required_error: "operation is required",
      invalid_type_error: "operation must be either add or reduce",
    }),
    note: z.string().max(200).optional(),
  }),
});

module.exports = { adjustBalanceSchema };
