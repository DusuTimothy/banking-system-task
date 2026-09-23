const db = require("../../data/db");
const { comparePassword } = require("../../utils/hash");
const { signToken } = require("../../utils/signToken");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = signToken(user.id);
    const { ...publicUser } = db.toPublicUser(user);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: { user: publicUser, token },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { login };
