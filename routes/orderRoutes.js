const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const orderController = require("../controllers/orderController");

// Create order
router.post("/", auth, orderController.createOrder);

// Get orders (IMPORTANT)
router.get("/", auth, orderController.getOrders);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> d9857561f7d27ebc749fa00ff03caf5e8ef47292
