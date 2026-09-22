const express = require("express");
const { getMe, getBalance, createPin, updatePin, search } = require("../controllers/userController");
const { authenticate } = require("../middlewares/authentication");
const { authorize } = require("../middlewares/authorization");
const validate = require("../middlewares/validate");
const { createPinSchema, updatePinSchema } = require("../schemas/authSchema");
const { searchQuerySchema } = require("../schemas/transactionSchema");
const { authLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

router.use(authenticate, authorize()); // every route below requires a valid JWT

router.get("/me", getMe);
router.get("/balance", getBalance);
router.get("/search", validate(searchQuerySchema), search);
router.post("/pin", authLimiter, validate(createPinSchema), createPin);
router.patch("/pin", authLimiter, validate(updatePinSchema), updatePin);

module.exports = router;
