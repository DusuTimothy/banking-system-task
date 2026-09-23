const { users, findUserById } = require("./users");

function hasAnyAdmin() {
  return users.some((u) => u.role === "admin");
}

function updateUserRole({ userId, role }) {
  const user = findUserById(userId);

  if (!user) {
    throw Object.assign(new Error("User not found"), { statusCode: 404 });
  }

  user.role = role;
  user.updatedAt = new Date().toISOString();

  return user;
}

module.exports = { updateUserRole, hasAnyAdmin };
