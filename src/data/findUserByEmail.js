const { users } = require("./users");

function findUserByEmail(email) {
  if (!email) return undefined;
  return users.find((u) => u.email === email.toLowerCase());
}

module.exports = { findUserByEmail };
