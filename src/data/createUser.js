const crypto = require("crypto");
const users = require("./stores/usersStore");
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

module.exports = { createUser };
