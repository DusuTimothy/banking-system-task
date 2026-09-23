const {
  users,
  createUser,
  findUserByEmail,
  findUserById,
  findUserByAccountNumber,
  searchUsers,
  toPublicUser,
  updateUserRole,
  hasAnyAdmin,
} = require("./users");

const {
  transactions,
  createTransaction,
  getTransactionsForUser,
  transferFunds,
  depositFunds,
  withdrawFunds,
  adjustBalance,
} = require("./transactions");

module.exports = {
  users,
  transactions,
  createUser,
  findUserByEmail,
  findUserById,
  findUserByAccountNumber,
  searchUsers,
  toPublicUser,
  updateUserRole,
  hasAnyAdmin,
  createTransaction,
  getTransactionsForUser,
  transferFunds,
  depositFunds,
  withdrawFunds,
  adjustBalance,
};
