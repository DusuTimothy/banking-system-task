const users = require("./stores/usersStore");

function findUserById(id) {
  return users.find((u) => u.id === id);
}

module.exports = { findUserById };
