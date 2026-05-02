const sequelize = require('../config/database');

const User = require('./User');
const Order = require('./Order');
const Product = require('./Product');
const OrderItem = require('./OrderItem');

// ✅ User ↔ Order (One-to-Many)
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// ✅ Order ↔ Product (Many-to-Many)
Order.belongsToMany(Product, {
  through: OrderItem,
  foreignKey: "orderId",
  otherKey: "productId"
});

Product.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: "productId",
  otherKey: "orderId"
});

module.exports = {
  sequelize,
  User,
  Order,
  Product,
  OrderItem,
};
