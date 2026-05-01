require("dotenv").config();

const sequelize = require("./config/database");
const Product = require("./models/Product");

const products = [
  {
    title: "Phone",
    price: 500,
    description: "Smartphone"
  },
  {
    title: "Laptop",
    price: 1200,
    description: "Laptop"
  }
];

const seed = async () => {
  try {
    console.log("🚀 Seed started");

    // 1. connect DB
    await sequelize.authenticate();
    console.log("✅ DB connected");

    // 2. sync tables
    await sequelize.sync({ alter: true });
    console.log("📦 DB synced");

    // 3. check if already seeded
    const count = await Product.count();

    if (count > 0) {
      console.log("⚠️ Database already has products");
      process.exit();
    }

    // 4. insert data
    await Product.bulkCreate(products);

    console.log("🎉 Seed completed successfully");

    process.exit();

  } catch (error) {
    console.log("❌ ERROR:", error);
    process.exit(1);
  }
};

seed();
