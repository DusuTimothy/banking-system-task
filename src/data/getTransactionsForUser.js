const transactions = require("./stores/transactionsStore");

function getTransactionsForUser(userId) {
  return transactions
    .filter((t) => t.fromUserId === userId || t.toUserId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

module.exports = { getTransactionsForUser };
