const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { generalLimiter } = require("./middlewares/limiters/generalLimiter");
const { errorHandler } = require("./middlewares/errorHandler");
const { corsOrigin } = require("./middlewares/corsOrigin");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

// ---- Security & parsing ----
app.use(helmet());
app.use(express.json({ limit: "10kb" }));

// ---- CORS ----
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: corsOrigin(allowedOrigins),
    credentials: true,
  })
);

// ---- Logging ----
if (process.env.NODE_ENV !== "test") {
  app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
}

// ---- Global rate limiting ----
app.use(generalLimiter);

// ---- Health check ----
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "OK" });
});

// ---- Routes ----
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// ---- 404 + error handler ----
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});
app.use(errorHandler);

module.exports = app;
