require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// ✅ MODELS أولاً
require('./models/Product');
require('./models/User');
require('./models/Order');
require('./models/index');

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= CORS =================
app.use(cors({
  origin: "*",
  credentials: true
}));

// ================= ROUTES =================
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// ================= TEST =================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "DZShop Backend is running 🚀"
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connected");

    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ ERROR:", err);
  });
