const { z } = require("zod");

const assignRoleSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "user id is required" }).uuid("id must be a valid UUID"),
  }),
  body: z.object({
    role: z.enum(["user", "admin"], {
      required_error: "role is required",
      invalid_type_error: "role must be either user or admin",
    }),
  }),
});

module.exports = { assignRoleSchema };
