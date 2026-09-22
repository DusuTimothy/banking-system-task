/**
 * Authorization middleware — decides what an authenticated caller may do.
 * Must run after `authenticate` so `req.user` is already set.
 *
 * Usage:
 *   authorize()                 — any authenticated user
 *   authorize("admin")          — require a specific role (when roles exist)
 *   authorize("admin", "staff") — allow any of the listed roles
 */
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    if (allowedRoles.length === 0) {
      return next();
    }

    const role = req.user.role;
    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this resource",
      });
    }

    next();
  };
}

module.exports = { authorize };
