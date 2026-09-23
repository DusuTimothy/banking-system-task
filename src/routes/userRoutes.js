const express = require("express");
const { getMe } = require("../controllers/user/getMe");
const { getBalance } = require("../controllers/user/getBalance");
const { createPin } = require("../controllers/user/createPin");
const { updatePin } = require("../controllers/user/updatePin");
const { search } = require("../controllers/user/search");
const { assignRole } = require("../controllers/user/assignRole");
const { adjustBalance } = require("../controllers/user/adjustBalance");
const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");
const validate = require("../middlewares/validate");
const { createPinSchema } = require("../schemas/auth/createPinSchema");
const { updatePinSchema } = require("../schemas/auth/updatePinSchema");
const { searchQuerySchema } = require("../schemas/transaction/searchQuerySchema");
const { assignRoleSchema } = require("../schemas/user/assignRoleSchema");
const { adjustBalanceSchema } = require("../schemas/user/adjustBalanceSchema");
const { authLimiter } = require("../middlewares/limiters/authLimiter");

const router = express.Router();

router.use(authenticate, authorize()); // every route below requires a valid JWT

router.get("/me", getMe);
router.get("/balance", getBalance);
router.get("/search", validate(searchQuerySchema), search);
router.post("/pin", authLimiter, validate(createPinSchema), createPin);
router.patch("/pin", authLimiter, validate(updatePinSchema), updatePin);

// Role: any authenticated user may assign while no admin exists; otherwise admin-only (enforced in controller)
router.put("/:id/role", validate(assignRoleSchema), assignRole);

// Balance adjustments are admin-only
router.put("/:id/balance", authorize("admin"), validate(adjustBalanceSchema), adjustBalance);

module.exports = router;
