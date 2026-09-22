const db = require("../../data/db");
const { toPublicUser } = require("../../utils/toPublicUser");

async function search(req, res, next) {
  try {
    const { q, limit } = req.validatedQuery;
    const results = db.searchUsers(q, { excludeId: req.user.id, limit });

    res.status(200).json({
      success: true,
      data: { results: results.map(toPublicUser), count: results.length },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { search };
