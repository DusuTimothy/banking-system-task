const crypto = require("crypto");
const { users } = require("./users");
const { generateAccountNumber } = require("./generateAccountNumber");

function createUser({ fullName, email, passwordHash }) {
  const user = {
    id: crypto.randomUUID(),
    fullName,
    email: email.toLowerCase(),
    passwordHash,
    pinHash: null, // set later via "create pin"
    balance: 0,
    accountNumber: generateAccountNumber(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(user);
  return user;
}

module.exports = { createUser };
