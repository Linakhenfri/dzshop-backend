const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const orderController = require("../controllers/orderController");

// Create order
router.post("/", auth, orderController.createOrder);

// Get orders (IMPORTANT)
router.get("/", auth, orderController.getOrders);


module.exports = router;



