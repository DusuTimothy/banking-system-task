const express = require("express");
const { transfer } = require("../controllers/transaction/transfer");
const { history } = require("../controllers/transaction/history");
const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");
const validate = require("../middlewares/validate");
const { transferSchema } = require("../schemas/transaction/transferSchema");
const { transferLimiter } = require("../middlewares/limiters/transferLimiter");

const router = express.Router();

router.use(authenticate, authorize());

router.post("/transfer", transferLimiter, validate(transferSchema), transfer);
router.get("/history", history);

module.exports = router;
