const rateLimit = require("express-rate-limit");

const withdrawLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many withdrawal attempts, try again later.",
  },
});

module.exports = { withdrawLimiter };
