const db = require("../../data/db");
const { hashPin } = require("../../utils/hash");

async function createPin(req, res, next) {
  try {
    const { pin } = req.body;
    const user = db.findUserById(req.user.id);

    if (user.pinHash) {
      return res.status(409).json({ success: false, message: "PIN already set, use update-pin instead" });
    }

    user.pinHash = await hashPin(pin);
    user.updatedAt = new Date().toISOString();

    res.status(201).json({ success: true, message: "PIN created successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = { createPin };
