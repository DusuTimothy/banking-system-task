const express = require("express");
const { transfer, history } = require("../controllers/transactionController");
const { authenticate } = require("../middlewares/authentication");
const { authorize } = require("../middlewares/authorization");
const validate = require("../middlewares/validate");
const { transferSchema } = require("../schemas/transactionSchema");
const { transferLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

router.use(authenticate, authorize());

router.post("/transfer", transferLimiter, validate(transferSchema), transfer);
router.get("/history", history);

module.exports = router;
