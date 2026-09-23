const { z } = require("zod");

const depositSchema = z.object({
  body: z.object({
    amount: z
      .number({ required_error: "amount is required", invalid_type_error: "amount must be a number" })
      .positive("amount must be greater than 0")
      .max(1_000_000, "amount exceeds the maximum allowed per deposit"),
    pin: z
      .string({ required_error: "pin is required" })
      .length(4, "pin must be exactly 4 digits")
      .regex(/^\d{4}$/, "pin must contain only digits"),
    note: z.string().max(200).optional(),
  }),
});

module.exports = { depositSchema };
