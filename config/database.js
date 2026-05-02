const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// 🔍 test DB connection
sequelize.authenticate()
  .then(() => console.log("✅ DB connected successfully"))
  .catch(err => console.error("❌ DB connection failed:", err));

module.exports = sequelize;
