const users = [];

function findUserById(id) {
  return users.find((u) => u.id === id);
}

function findUserByAccountNumber(accountNumber) {
  return users.find((u) => u.accountNumber === accountNumber);
}

function toPublicUser(user) {
  if (!user) return null;
  const { passwordHash, pinHash, ...publicFields } = user;
  return { ...publicFields, hasPin: Boolean(pinHash) };
}

// Export store + helpers first so sibling modules can require without circular issues
module.exports = { users, findUserById, findUserByAccountNumber, toPublicUser };

const { createUser } = require("./createUser");
const { findUserByEmail } = require("./findUserByEmail");
const { searchUsers } = require("./searchUsers");
const { updateUserRole, hasAnyAdmin } = require("./updateUserRole");

module.exports.createUser = createUser;
module.exports.findUserByEmail = findUserByEmail;
module.exports.searchUsers = searchUsers;
module.exports.updateUserRole = updateUserRole;
module.exports.hasAnyAdmin = hasAnyAdmin;
