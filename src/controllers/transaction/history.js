const db = require("../../data/db");

async function history(req, res, next) {
  try {
    const txs = db.getTransactionsForUser(req.user.id);
    res.status(200).json({ success: true, data: { transactions: txs, count: txs.length } });
  } catch (err) {
    next(err);
  }
}

module.exports = { history };
