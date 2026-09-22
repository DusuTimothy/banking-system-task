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

const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "email is required" }).trim().email().toLowerCase(),
    password: z.string({ required_error: "password is required" }).min(1),
  }),
});

const createPinSchema = z.object({
  body: z.object({
    pin: z
      .string({ required_error: "pin is required" })
      .length(4, "pin must be exactly 4 digits")
      .regex(/^\d{4}$/, "pin must contain only digits"),
  }),
});

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

module.exports = { registerSchema, loginSchema, createPinSchema, updatePinSchema };
