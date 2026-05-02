const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const productController = require('../controllers/productController');

// ✅ GET products (pagination + filter)
router.get('/', productController.getAllProducts);

// 🔐 POST product (protected)
router.post('/', auth, productController.createProduct);

module.exports = router;
