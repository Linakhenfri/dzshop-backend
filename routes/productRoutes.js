const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const productController = require('../controllers/productController');

// GET products
router.get('/', productController.getAllProducts);

// CREATE product (protected)
router.post('/', auth, productController.createProduct);

module.exports = router;
