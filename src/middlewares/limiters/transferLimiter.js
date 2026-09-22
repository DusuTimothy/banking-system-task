const rateLimit = require("express-rate-limit");

const transferLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many transfer attempts, please slow down.",
  },
});

module.exports = { transferLimiter };
