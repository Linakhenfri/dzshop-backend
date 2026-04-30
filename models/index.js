const sequelize = require('../config/database');

const User = require('./User');
const Order = require('./Order');
const Product = require('./Product');
const OrderItem = require('./OrderItem'); // ✅ استعملي model منفصل

// ================= RELATIONS =================

// User ↔ Order
User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId' });

// 🔥 Order ↔ Product (Many-to-Many)
Order.belongsToMany(Product, {
  through: OrderItem,
  foreignKey: 'OrderId',
});

Product.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: 'ProductId',
});

module.exports = {
  sequelize,
  User,
  Order,
  Product,
  OrderItem,
};