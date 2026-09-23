const {
  users,
  createUser,
  findUserByEmail,
  findUserById,
  findUserByAccountNumber,
  searchUsers,
  toPublicUser,
} = require("./users");

const {
  transactions,
  createTransaction,
  getTransactionsForUser,
  transferFunds,
  depositFunds,
  withdrawFunds,
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
  createTransaction,
  getTransactionsForUser,
  transferFunds,
  depositFunds,
  withdrawFunds,
};
