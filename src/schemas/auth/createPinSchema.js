const { z } = require("zod");

const createPinSchema = z.object({
  body: z.object({
    pin: z
      .string({ required_error: "pin is required" })
      .length(4, "pin must be exactly 4 digits")
      .regex(/^\d{4}$/, "pin must contain only digits"),
  }),
});

module.exports = { createPinSchema };
