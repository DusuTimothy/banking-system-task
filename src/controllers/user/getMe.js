const db = require("../../data/db");

async function getMe(req, res, next) {
  try {
    res.status(200).json({ success: true, data: { user: db.toPublicUser(req.user) } });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMe };
