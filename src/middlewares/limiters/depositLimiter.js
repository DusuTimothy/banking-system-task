const rateLimit = require("express-rate-limit");

const depositLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many deposit attempts, try again later.",
  },
});

module.exports = { depositLimiter };
