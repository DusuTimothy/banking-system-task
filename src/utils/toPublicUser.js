function toPublicUser(user) {
  if (!user) return null;
  const { passwordHash, pinHash, ...publicFields } = user;
  return { ...publicFields, hasPin: Boolean(pinHash) };
}

module.exports = { toPublicUser };
  