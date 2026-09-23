const { findUserById } = require("./users");
const { createTransaction } = require("./createTransaction");

function depositFunds({ userId, amount }) {
  const user = findUserById(userId);

  if (!user) {
    throw Object.assign(new Error("User not found"), { statusCode: 404 });
  }

  user.balance = Number((user.balance + amount).toFixed(2));
  user.updatedAt = new Date().toISOString();

  // External credit: no sender; recipient is the depositing user
  const tx = createTransaction({ fromUserId: null, toUserId: user.id, amount });

  return { user, transaction: tx };
}

module.exports = { depositFunds };
