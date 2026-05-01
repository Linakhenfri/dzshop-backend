const sequelize = require('../config/database');

const User = require('./User');
const Order = require('./Order');
const Product = require('./Product');
const OrderItem = require('./OrderItem');

// User ↔ Order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Order ↔ OrderItem
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// Product ↔ OrderItem
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

module.exports = {
  sequelize,
  User,
  Order,
  Product,
  OrderItem,
};
