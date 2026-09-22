const bcrypt = require("bcryptjs");

async function hashPassword(plain) {
  const rounds = Number(process.env.PASSWORD_SALT_ROUNDS) || 10;
  return bcrypt.hash(plain, rounds);
}

async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

async function hashPin(plain) {
  const rounds = Number(process.env.PIN_SALT_ROUNDS) || 10;
  return bcrypt.hash(plain, rounds);
}

async function comparePin(plain, hash) {
  return bcrypt.compare(plain, hash);
}

module.exports = { hashPassword, comparePassword, hashPin, comparePin };
