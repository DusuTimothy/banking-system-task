const { findUserById } = require("./users");
const { createTransaction } = require("./createTransaction");

function transferFunds({ fromUserId, toUserId, amount }) {
  const sender = findUserById(fromUserId);
  const recipient = findUserById(toUserId);

  if (!sender || !recipient) {
    throw Object.assign(new Error("Sender or recipient not found"), { statusCode: 404 });
  }
  if (sender.id === recipient.id) {
    throw Object.assign(new Error("Cannot transfer to your own account"), { statusCode: 400 });
  }
  if (sender.balance < amount) {
    throw Object.assign(new Error("Insufficient balance"), { statusCode: 400 });
  }

  sender.balance = Number((sender.balance - amount).toFixed(2));
  recipient.balance = Number((recipient.balance + amount).toFixed(2));
  sender.updatedAt = new Date().toISOString();
  recipient.updatedAt = new Date().toISOString();

  const tx = createTransaction({ fromUserId: sender.id, toUserId: recipient.id, amount });

  return { sender, recipient, transaction: tx };
}

module.exports = { transferFunds };
