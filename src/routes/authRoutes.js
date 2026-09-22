const express = require("express");
const { register } = require("../controllers/auth/register");
const { login } = require("../controllers/auth/login");
const validate = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../schemas/authSchema");
const { authLimiter } = require("../middlewares/limiters/authLimiter");

const router = express.Router();

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);

module.exports = router;
