const { registerSchema } = require("./auth/registerSchema");
const { loginSchema } = require("./auth/loginSchema");
const { createPinSchema } = require("./auth/createPinSchema");
const { updatePinSchema } = require("./auth/updatePinSchema");

module.exports = { registerSchema, loginSchema, createPinSchema, updatePinSchema };
