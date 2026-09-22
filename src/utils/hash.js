const { hashPassword } = require("./hash/hashPassword");
const { comparePassword } = require("./hash/comparePassword");
const { hashPin } = require("./hash/hashPin");
const { comparePin } = require("./hash/comparePin");

module.exports = { hashPassword, comparePassword, hashPin, comparePin };
