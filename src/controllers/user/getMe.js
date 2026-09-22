const { toPublicUser } = require("../../utils/serialize");

async function getMe(req, res, next) {
  try {
    res.status(200).json({ success: true, data: { user: toPublicUser(req.user) } });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMe };
