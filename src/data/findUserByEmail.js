const users = require("./stores/usersStore");

function findUserByEmail(email) {
  if (!email) return undefined;
  return users.find((u) => u.email === email.toLowerCase());
}

module.exports = { findUserByEmail };
