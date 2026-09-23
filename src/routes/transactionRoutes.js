const express = require("express");
const { transfer } = require("../controllers/transaction/transfer");
const { deposit } = require("../controllers/transaction/deposit");
const { withdraw } = require("../controllers/transaction/withdraw");
const { history } = require("../controllers/transaction/history");
const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");
const validate = require("../middlewares/validate");
const { transferSchema } = require("../schemas/transaction/transferSchema");
const { depositSchema } = require("../schemas/transaction/depositSchema");
const { withdrawSchema } = require("../schemas/transaction/withdrawSchema");
const { transferLimiter } = require("../middlewares/limiters/transferLimiter");
const { depositLimiter } = require("../middlewares/limiters/depositLimiter");
const { withdrawLimiter } = require("../middlewares/limiters/withdrawLimiter");

const router = express.Router();

router.use(authenticate, authorize());

router.post("/transfer", transferLimiter, validate(transferSchema), transfer);
router.post("/deposit", depositLimiter, validate(depositSchema), deposit);
router.post("/withdraw", withdrawLimiter, validate(withdrawSchema), withdraw);
router.get("/history", history);

module.exports = router;
