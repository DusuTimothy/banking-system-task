const { users } = require("./stores");

function generateAccountNumber() {
  // 10-digit numeric account number, guaranteed unique within this dummy DB
  let accountNumber;
  do {
    accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  } while (users.some((u) => u.accountNumber === accountNumber));
  return accountNumber;
}

module.exports = { generateAccountNumber };
