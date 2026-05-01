const { Order, Product, OrderItem } = require("../models");

exports.createOrder = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { items } = req.body;
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({
        error: "Items are required"
      });
    }

    let totalPrice = 0;

    // 🔥 1. check stock + calculate price
    for (let item of items) {
      const product = await Product.findByPk(item.productId);

      if (!product) {
        return res.status(404).json({
          error: `Product ${item.productId} not found`
        });
      }

      // ❌ OUT OF STOCK CHECK
      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Out of Stock for product ${product.title}`
        });
      }

      totalPrice += product.price * item.quantity;
    }

    // 🧾 2. create order
    const order = await Order.create({
      userId,
      totalPrice
    });

    // 🔗 3. create order items + update stock
    for (let item of items) {
      const product = await Product.findByPk(item.productId);

      await OrderItem.create({
        OrderId: order.id,
        ProductId: item.productId,
        quantity: item.quantity
      });

      // 🔻 reduce stock
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
