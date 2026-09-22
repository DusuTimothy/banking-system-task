const db = require("../../data/db");
const { hashPin, comparePin } = require("../../utils/hash");

async function updatePin(req, res, next) {
  try {
    const { currentPin, newPin } = req.body;
    const user = db.findUserById(req.user.id);

    if (!user.pinHash) {
      return res.status(400).json({ success: false, message: "No PIN set yet, use create-pin first" });
    }

    const isMatch = await comparePin(currentPin, user.pinHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Current PIN is incorrect" });
    }

    user.pinHash = await hashPin(newPin);
    user.updatedAt = new Date().toISOString();

    res.status(200).json({ success: true, message: "PIN updated successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = { updatePin };
