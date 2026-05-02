const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// GET
router.get('/', productController.getAllProducts);

// POST (protected)
router.post('/', auth, productController.createProduct);

module.exports = router;
