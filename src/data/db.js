const {
  users,
  createUser,
  findUserByEmail,
  findUserById,
  findUserByAccountNumber,
  searchUsers,
} = require("./users");

const {
  transactions,
  createTransaction,
  getTransactionsForUser,
  transferFunds,
} = require("./transactions");

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
