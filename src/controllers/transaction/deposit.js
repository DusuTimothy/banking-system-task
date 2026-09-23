const db = require("../../data/db");
const { comparePin } = require("../../utils/hash");

async function deposit(req, res, next) {
  try {
    const { amount, pin, note } = req.body;
    const user = db.findUserById(req.user.id);

    if (!user.pinHash) {
      return res.status(400).json({ success: false, message: "Set up a transaction PIN before making deposits" });
    }

    const isPinValid = await comparePin(pin, user.pinHash);
    if (!isPinValid) {
      return res.status(401).json({ success: false, message: "Incorrect PIN" });
    }

    // Synchronous, no await inside — same in-memory atomicity rationale as transferFunds
    const { user: updatedUser, transaction } = db.depositFunds({
      userId: user.id,
      amount,
    });

    if (note) transaction.note = note;

    res.status(200).json({
      success: true,
      message: `Deposit of ${amount} was successful`,
      data: {
        transaction,
        newBalance: updatedUser.balance,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { deposit };
