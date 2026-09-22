const crypto = require("crypto");

/**
 * Dummy in-memory "database".
 * Data lives only in process memory and resets whenever the server restarts.
 * This is for development / demo purposes only — not persistent, not shared
 * across multiple server instances.
 */

/** @type {Array<Object>} */
const users = [];

/** @type {Array<Object>} */
const transactions = [];

// ---- Users ----

function createUser({ fullName, email, passwordHash }) {
  const user = {
    id: crypto.randomUUID(),
    fullName,
    email: email.toLowerCase(),
    passwordHash,
    pinHash: null, // set later via "create pin"
    balance: 0,
    accountNumber: generateAccountNumber(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

function findUserByEmail(email) {
  if (!email) return undefined;
  return users.find((u) => u.email === email.toLowerCase());
}

function findUserById(id) {
  return users.find((u) => u.id === id);
}

function findUserByAccountNumber(accountNumber) {
  return users.find((u) => u.accountNumber === accountNumber);
}

function searchUsers(query, { excludeId, limit = 20 } = {}) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  return users
    .filter((u) => u.id !== excludeId)
    .filter(
      (u) =>
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.accountNumber.includes(q)
    )
    .slice(0, limit);
}

function generateAccountNumber() {
  // 10-digit numeric account number, guaranteed unique within this dummy DB
  let accountNumber;
  do {
    accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  } while (users.some((u) => u.accountNumber === accountNumber));
  return accountNumber;
}

// ---- Transactions ----

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

function getTransactionsForUser(userId) {
  return transactions
    .filter((t) => t.fromUserId === userId || t.toUserId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Performs a transfer synchronously — no `await` between reading and writing
 * balances — so no other request can interleave and cause a race condition.
 * Node's single-threaded event loop makes this block atomic in practice.
 */
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

module.exports = {
  users,
  transactions,
  createUser,
  findUserByEmail,
  findUserById,
  findUserByAccountNumber,
  searchUsers,
  createTransaction,
  getTransactionsForUser,
  transferFunds,
};
