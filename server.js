require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();

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

const PORT = process.env.PORT || 3000;

// DB + server start (مرة واحدة فقط)
sequelize.authenticate()
  .then(() => {
    console.log("✅ DB connected");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("🚀 Server running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("❌ ERROR:", err);
  });
