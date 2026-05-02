const { Order, Product } = require("../models");

// ✅ CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Items are required" });
    }

    const productIds = items.map(i => i.productId);

    const products = await Product.findAll({
      where: { id: productIds }
    });

    let totalPrice = 0;

    // check stock
    for (let item of items) {
      const product = products.find(p => p.id === item.productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Out of stock for ${product.title}`
        });
      }

      totalPrice += product.price * item.quantity;
    }

    // create order
    const order = await Order.create({
      userId,
      totalPrice
    });

    // 🔥 fill OrderItems
    for (let item of items) {
      const product = products.find(p => p.id === item.productId);

      await order.addProduct(product, {
        through: { quantity: item.quantity }
      });

      product.stock -= item.quantity;
      await product.save();
    }

    res.status(201).json({
      message: "Order created successfully",
      order
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};


// ✅ GET ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product,
          through: { attributes: ["quantity"] }
        }
      ]
    });

    res.json(orders);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
