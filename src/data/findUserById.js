const { users } = require("./stores");

function findUserById(id) {
  return users.find((u) => u.id === id);
}

module.exports = { findUserById };
