const express = require("express");
const { getMe } = require("../controllers/user/getMe");
const { getBalance } = require("../controllers/user/getBalance");
const { createPin } = require("../controllers/user/createPin");
const { updatePin } = require("../controllers/user/updatePin");
const { search } = require("../controllers/user/search");
const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");
const validate = require("../middlewares/validate");
const { createPinSchema } = require("../schemas/auth/createPinSchema");
const { updatePinSchema } = require("../schemas/auth/updatePinSchema");
const { searchQuerySchema } = require("../schemas/transaction/searchQuerySchema");
const { authLimiter } = require("../middlewares/limiters/authLimiter");

const router = express.Router();

router.use(authenticate, authorize()); // every route below requires a valid JWT

router.get("/me", getMe);
router.get("/balance", getBalance);
router.get("/search", validate(searchQuerySchema), search);
router.post("/pin", authLimiter, validate(createPinSchema), createPin);
router.patch("/pin", authLimiter, validate(updatePinSchema), updatePin);

module.exports = router;
