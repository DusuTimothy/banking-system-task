const bcrypt = require("bcryptjs");

async function hashPassword(plain) {
  const rounds = Number(process.env.PASSWORD_SALT_ROUNDS) || 10;
  return bcrypt.hash(plain, rounds);
}

module.exports = { hashPassword };
