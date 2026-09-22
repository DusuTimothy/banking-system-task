const bcrypt = require("bcryptjs");

async function comparePin(plain, hash) {
  return bcrypt.compare(plain, hash);
}

module.exports = { comparePin };
