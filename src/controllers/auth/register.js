const db = require("../../data/db");
const { hashPassword } = require("../../utils/hash");
const { signToken } = require("../../utils/jwt");
const { toPublicUser } = require("../../utils/serialize");

async function register(req, res, next) {
  try {
    const { fullName, email, password } = req.body;

    if (db.findUserByEmail(email)) {
      return res.status(409).json({ success: false, message: "An account with this email already exists" });
    }

    const passwordHash = await hashPassword(password);
    const user = db.createUser({ fullName, email, passwordHash });
    const token = signToken(user.id);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: { user: toPublicUser(user), token },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { register };
