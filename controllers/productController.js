const { Product } = require('../models');

// GET PRODUCTS
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;

    const offset = (page - 1) * limit;

    const products = await Product.findAll({
      where: category ? { category } : {},
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    return res.status(200).json({ products });

  } catch (error) {
    console.log("❌ ERROR:", error);

    return res.status(500).json({
      message: error.message
    });
  }
};

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    return res.status(201).json(product);

  } catch (error) {
    console.log("❌ ERROR:", error);

    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  createProduct
};
