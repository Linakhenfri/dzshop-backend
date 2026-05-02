const sequelize = require('../config/database');

const User = require('./User');
const Order = require('./Order');
const Product = require('./Product');
const OrderItem = require('./OrderItem');

// User ↔ Order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// 🔥 Many-to-Many (المهم)
Order.belongsToMany(Product, {
  through: OrderItem,
  foreignKey: "orderId"
});

Product.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: "productId"
});

module.exports = {
  sequelize,
  User,
  Order,
  Product,
  OrderItem,
};
