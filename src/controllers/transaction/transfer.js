const db = require("../../data/db");
const { comparePin } = require("../../utils/hash");

async function transfer(req, res, next) {
  try {
    const { toAccountNumber, amount, pin, note } = req.body;
    const sender = db.findUserById(req.user.id);

    if (!sender.pinHash) {
      return res.status(400).json({ success: false, message: "Set up a transaction PIN before making transfers" });
    }

    const isPinValid = await comparePin(pin, sender.pinHash);
    if (!isPinValid) {
      return res.status(401).json({ success: false, message: "Incorrect PIN" });
    }

    const recipient = db.findUserByAccountNumber(toAccountNumber);
    if (!recipient) {
      return res.status(404).json({ success: false, message: "Recipient account not found" });
    }

    // Synchronous, no await inside — see db.transferFunds for why this is safe
    // from race conditions against this in-memory store.
    const { sender: updatedSender, recipient: updatedRecipient, transaction } = db.transferFunds({
      fromUserId: sender.id,
      toUserId: recipient.id,
      amount,
    });

    if (note) transaction.note = note;

    res.status(200).json({
      success: true,
      message: `Transfer of ${amount} to ${updatedRecipient.fullName} was successful`,
      data: {
        transaction,
        newBalance: updatedSender.balance,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { transfer };
