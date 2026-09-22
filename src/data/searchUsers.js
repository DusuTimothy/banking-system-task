const users = require("./stores/usersStore");

function searchUsers(query, { excludeId, limit = 20 } = {}) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  return users
    .filter((u) => u.id !== excludeId)
    .filter(
      (u) =>
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.accountNumber.includes(q)
    )
    .slice(0, limit);
}

module.exports = { searchUsers };
