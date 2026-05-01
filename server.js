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

// ✅ MODELS أولاً
>>>>>>> d9857561f7d27ebc749fa00ff03caf5e8ef47292
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

<<<<<<< HEAD
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
>>>>>>> d9857561f7d27ebc749fa00ff03caf5e8ef47292
