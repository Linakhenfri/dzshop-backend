require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');



const app = express();


app.use(express.json());


app.use(cors({
  origin: true,
  credentials: true
}));


app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "DZShop Backend is running 🚀"
  });
});


app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API is healthy 🚀"
  });
});


app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));





require('./models/Product');
require('./models/User');
require('./models/Order');
require('./models/index');



const app = express();

app.use(express.json());

app.use(cors({
  origin: "*",
  credentials: true
}));


app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "DZShop Backend is running 🚀"
  });
});



const PORT = process.env.PORT || 3000;


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
