const db = require("../../data/db");

async function adjustBalance(req, res, next) {
  try {
    const { id } = req.params;
    const { amount, operation, note } = req.body;

    const { user, transaction } = db.adjustBalance({
      userId: id,
      amount,
      operation,
      note,
    });

    res.status(200).json({
      success: true,
      message: `Balance ${operation === "add" ? "increased" : "reduced"} by ${amount}`,
      data: {
        transaction,
        newBalance: user.balance,
        user: db.toPublicUser(user),
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { adjustBalance };
