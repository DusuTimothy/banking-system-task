const { users } = require("./stores");

function findUserByAccountNumber(accountNumber) {
  return users.find((u) => u.accountNumber === accountNumber);
}

module.exports = { findUserByAccountNumber };
