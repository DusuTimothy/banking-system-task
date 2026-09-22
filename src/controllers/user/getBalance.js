async function getBalance(req, res, next) {
  try {
    res.status(200).json({
      success: true,
      data: { balance: req.user.balance, accountNumber: req.user.accountNumber },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getBalance };
