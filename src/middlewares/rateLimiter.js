const { generalLimiter } = require("./limiters/generalLimiter");
const { authLimiter } = require("./limiters/authLimiter");
const { transferLimiter } = require("./limiters/transferLimiter");

module.exports = { generalLimiter, authLimiter, transferLimiter };
