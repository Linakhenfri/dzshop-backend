require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// ================= APP =================
const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= CORS =================
app.use(cors({
  origin: true,
  credentials: true
}));
// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "DZShop Backend is running 🚀"
  });
});

// ================= HEALTH CHECK =================
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API is healthy 🚀"
  });
});

// ================= ROUTES =================
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// ================= MODELS =================
require('./models/Product');
require('./models/User');
require('./models/Order');
require('./models/index');

// ================= START SERVER =================
const PORT = process.env.PORT || 3000;

// مهم: تحسين error handling
sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");

    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ DB ERROR:", err);
  });
