const bcrypt = require("bcryptjs");

async function hashPin(plain) {
  const rounds = Number(process.env.PIN_SALT_ROUNDS) || 10;
  return bcrypt.hash(plain, rounds);
}

module.exports = { hashPin };
