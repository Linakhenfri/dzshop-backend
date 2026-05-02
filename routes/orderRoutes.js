const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const orderController = require("../controllers/orderController");

// 🔐 Create order (user must be logged in)
router.post("/", auth, orderController.createOrder);

// 🔐 Get user orders (protected)
router.get("/", auth, orderController.getOrders);

module.exports = router;
