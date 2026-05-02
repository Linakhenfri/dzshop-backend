require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

// test DB
app.get("/test-db", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// health
app.get("/", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("📦 DB synced");

    app.listen(PORT, () => {
      console.log("🚀 Server running on port", PORT);
    });
  })
  .catch(err => {
    console.error("❌ SYNC ERROR:", err);
  });