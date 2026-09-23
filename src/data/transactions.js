const transactions = [];

// Export store first so sibling modules can require without circular issues
module.exports = { transactions };

const { createTransaction } = require("./createTransaction");
const { getTransactionsForUser } = require("./getTransactionsForUser");
const { transferFunds } = require("./transferFunds");
const { depositFunds } = require("./depositFunds");
const { withdrawFunds } = require("./withdrawFunds");
const { adjustBalance } = require("./adjustBalance");

module.exports.createTransaction = createTransaction;
module.exports.getTransactionsForUser = getTransactionsForUser;
module.exports.transferFunds = transferFunds;
module.exports.depositFunds = depositFunds;
module.exports.withdrawFunds = withdrawFunds;
module.exports.adjustBalance = adjustBalance;
