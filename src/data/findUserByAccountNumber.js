const users = require("./stores/usersStore");

function findUserByAccountNumber(accountNumber) {
  return users.find((u) => u.accountNumber === accountNumber);
}

module.exports = { findUserByAccountNumber };
