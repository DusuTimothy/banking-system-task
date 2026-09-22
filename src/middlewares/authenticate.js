const jwt = require("jsonwebtoken");
const { findUserById } = require("../data/db");

/**
 * Authentication middleware — establishes who the caller is.
 * Verifies the Bearer JWT and attaches the user record to `req.user`.
 */
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authenticated, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "User belonging to this token no longer exists" });
    }

    req.user = user; // full dummy-db user record (includes passwordHash/pinHash - never send this back as-is)
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Not authenticated, invalid or expired token" });
  }
}

module.exports = { authenticate };
