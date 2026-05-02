const Product = require('../models/Product');

// GET PRODUCTS (pagination + filter)
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;

    const offset = (page - 1) * limit;

    const products = await Product.findAll({
      where: category ? { category } : {},
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    return res.status(200).json({
      products
    });

  } catch (error) {
    console.log("❌ FULL ERROR:");
    console.log(error);

    return res.status(500).json({
      message: error.message
    });
  }
};

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    return res.status(201).json(newProduct);

  } catch (error) {
    console.log("❌ ERROR:", error);

    return res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  createProduct
};
