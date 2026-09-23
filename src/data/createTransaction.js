const crypto = require("crypto");
const { transactions } = require("./transactions");

function createTransaction({ fromUserId, toUserId, amount, note }) {
  const tx = {
    id: crypto.randomUUID(),
    fromUserId,
    toUserId,
    amount,
    note: note || "",
    createdAt: new Date().toISOString(),
  };
  transactions.push(tx);
  return tx;
}

module.exports = { createTransaction };
