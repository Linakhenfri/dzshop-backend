const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// GET (pagination + filter)
router.get('/', productController.getAllProducts);

// POST
router.post('/', productController.createProduct);

module.exports = router;
