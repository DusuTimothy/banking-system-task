const { z } = require("zod");

const registerSchema = z.object({
  body: z.object({
    fullName: z
      .string({ required_error: "fullName is required" })
      .trim()
      .min(2, "fullName must be at least 2 characters")
      .max(100),
    email: z
      .string({ required_error: "email is required" })
      .trim()
      .email("Invalid email address")
      .toLowerCase(),
    password: z
      .string({ required_error: "password is required" })
      .min(8, "password must be at least 8 characters")
      .max(128)
      .regex(/[A-Z]/, "password must contain at least one uppercase letter")
      .regex(/[a-z]/, "password must contain at least one lowercase letter")
      .regex(/[0-9]/, "password must contain at least one number"),
  }),
});

module.exports = { registerSchema };
