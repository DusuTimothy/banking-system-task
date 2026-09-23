const { transactions } = require("./stores");
const { createTransaction } = require("./createTransaction");
const { getTransactionsForUser } = require("./getTransactionsForUser");
const { transferFunds } = require("./transferFunds");
const { depositFunds } = require("./depositFunds");
const { withdrawFunds } = require("./withdrawFunds");

module.exports = {
  transactions,
  createTransaction,
  getTransactionsForUser,
  transferFunds,
  depositFunds,
  withdrawFunds,
};
