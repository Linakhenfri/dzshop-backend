const { Sequelize } = require('sequelize');
require('dotenv').config();

// 🔍 Debug (اختياري للتأكد من .env)
console.log("ENV FILE TEST:", process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,

  // 🔐 مهم للـ hosting (Render / Railway / Supabase)
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;