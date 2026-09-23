const { findUserById } = require("./findUserById");
const { createTransaction } = require("./createTransaction");

function withdrawFunds({ userId, amount }) {
  const user = findUserById(userId);

  if (!user) {
    throw Object.assign(new Error("User not found"), { statusCode: 404 });
  }
  if (user.balance < amount) {
    throw Object.assign(new Error("Insufficient balance"), { statusCode: 400 });
  }

  user.balance = Number((user.balance - amount).toFixed(2));
  user.updatedAt = new Date().toISOString();

  // External debit: sender is the withdrawing user; no recipient
  const tx = createTransaction({ fromUserId: user.id, toUserId: null, amount });

  return { user, transaction: tx };
}

module.exports = { withdrawFunds };
