const { Order, Product, OrderItem } = require("../models");


exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Items are required" });
    }

    let totalPrice = 0;

    for (let item of items) {
      const product = await Product.findByPk(item.productId);

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

    const order = await Order.create({
      userId,
      totalPrice
    });

    for (let item of items) {
      const product = await Product.findByPk(item.productId);

      await OrderItem.create({
        OrderId: order.id,
        ProductId: item.productId,
        quantity: item.quantity
      });

      product.stock -= item.quantity;
      await product.save();
    }

    res.status(201).json({
      message: "Order created successfully",
      order,
      totalPrice
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ]
    });

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
