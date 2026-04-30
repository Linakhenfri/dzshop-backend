require('dotenv').config();
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const express = require('express');
const cors = require('cors');

const sequelize = require('./config/database');

// ================= ENV =================
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

// debug
console.log("ENV EXISTS:", fs.existsSync(envPath));
console.log("DATABASE_URL =", process.env.DATABASE_URL);

// ================= APP =================
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// ================= ROUTES =================

// PRODUCTS
app.use('/api/products', require('./routes/productRoutes'));

// ORDERS
console.log("LOADING ORDER ROUTES...");
app.use('/api/orders', require('./routes/orderRoutes'));

// ================= HEALTH =================
app.get('/health', (req, res) => {
  res.json({ message: 'DZ-Shop API is running!' });
});

// ================= MODELS =================
require('./models/Product');
require('./models/User');
require('./models/Order');
require('./models/index'); // العلاقات (associations)

// ================= START SERVER =================
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database connected");

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch(err => {
    console.log("DB ERROR:", err);
  });