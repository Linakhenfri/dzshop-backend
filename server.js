require('dotenv').config();

const express = require('express');

const cors = require('cors');
const sequelize = require('./config/database');

const app = express();
app.get("/test-db", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ ok: true, message: "DB connected" });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

app.use(express.json());

app.use(cors({
  origin: "*"
}));

// routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// health check
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "DZShop Backend is running 🚀" });
});

// 🚀 Start server AFTER DB sync
const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log("📦 DB synced");
    app.listen(PORT, () => {
      console.log("🚀 Server running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("❌ Sync error:", err);
  });
