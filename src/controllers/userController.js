const db = require("../data/db");
const { hashPin, comparePin } = require("../utils/hash");
const { toPublicUser } = require("../utils/serialize");

async function getMe(req, res, next) {
  try {
    res.status(200).json({ success: true, data: { user: toPublicUser(req.user) } });
  } catch (err) {
    next(err);
  }
}

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

async function createPin(req, res, next) {
  try {
    const { pin } = req.body;
    const user = db.findUserById(req.user.id);

    if (user.pinHash) {
      return res.status(409).json({ success: false, message: "PIN already set, use update-pin instead" });
    }

    user.pinHash = await hashPin(pin);
    user.updatedAt = new Date().toISOString();

    res.status(201).json({ success: true, message: "PIN created successfully" });
  } catch (err) {
    next(err);
  }
}

async function updatePin(req, res, next) {
  try {
    const { currentPin, newPin } = req.body;
    const user = db.findUserById(req.user.id);

    if (!user.pinHash) {
      return res.status(400).json({ success: false, message: "No PIN set yet, use create-pin first" });
    }

    const isMatch = await comparePin(currentPin, user.pinHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Current PIN is incorrect" });
    }

    user.pinHash = await hashPin(newPin);
    user.updatedAt = new Date().toISOString();

    res.status(200).json({ success: true, message: "PIN updated successfully" });
  } catch (err) {
    next(err);
  }
}

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

module.exports = { getMe, getBalance, createPin, updatePin, search };
