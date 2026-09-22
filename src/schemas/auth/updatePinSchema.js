const { z } = require("zod");

const updatePinSchema = z.object({
  body: z.object({
    currentPin: z
      .string({ required_error: "currentPin is required" })
      .length(4, "currentPin must be exactly 4 digits")
      .regex(/^\d{4}$/, "currentPin must contain only digits"),
    newPin: z
      .string({ required_error: "newPin is required" })
      .length(4, "newPin must be exactly 4 digits")
      .regex(/^\d{4}$/, "newPin must contain only digits"),
  }),
});

module.exports = { updatePinSchema };
