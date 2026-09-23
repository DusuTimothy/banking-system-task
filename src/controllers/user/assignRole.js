const db = require("../../data/db");

async function assignRole(req, res, next) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const isAdmin = req.user.role === "admin";
    const canBootstrap = !db.hasAnyAdmin();

    // Only admins may change roles, except when no admin exists yet (bootstrap)
    if (!isAdmin && !canBootstrap) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this resource",
      });
    }

    const user = db.updateUserRole({ userId: id, role });

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      data: { user: db.toPublicUser(user) },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { assignRole };
