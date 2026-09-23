const { findUserById } = require("./users");
const { createTransaction } = require("./createTransaction");

/**
 * Admin-only balance mutation. `operation` is "add" or "reduce".
 */
function adjustBalance({ userId, amount, operation, note }) {
  const user = findUserById(userId);

  if (!user) {
    throw Object.assign(new Error("User not found"), { statusCode: 404 });
  }

  if (operation === "reduce" && user.balance < amount) {
    throw Object.assign(new Error("Insufficient balance"), { statusCode: 400 });
  }

  if (operation === "add") {
    user.balance = Number((user.balance + amount).toFixed(2));
  } else {
    user.balance = Number((user.balance - amount).toFixed(2));
  }
  user.updatedAt = new Date().toISOString();

  const tx = createTransaction({
    fromUserId: operation === "reduce" ? user.id : null,
    toUserId: operation === "add" ? user.id : null,
    amount,
    note: note || `Admin balance ${operation}`,
  });

  return { user, transaction: tx };
}

module.exports = { adjustBalance };
