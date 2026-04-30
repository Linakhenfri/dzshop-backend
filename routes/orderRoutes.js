const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const orderController = require("../controllers/orderController");

// ✅ Create order (protected route)
router.post("/", auth, orderController.createOrder);

module.exports = router;