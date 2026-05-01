
require("dotenv").config();

const sequelize = require("./config/database");
const Product = require("./models/Product");

const products = [
  { title: "Phone", price: 500, description: "Smartphone" },
  { title: "Laptop", price: 1200, description: "Laptop" }
];

const seed = async () => {
  try {
    console.log("🚀 Seed started");

    await sequelize.authenticate();
    console.log("✅ DB connected");

    await sequelize.sync();
    console.log("📦 DB synced");

    const count = await Product.count();
    console.log("📊 Products in DB:", count);

    if (count > 0) {
      console.log("⚠️ Already seeded");
      return process.exit();

const seed = async () => {
  try {
    await sequelize.sync(); // ❌ بدون force

    const count = await Product.count();
    if (count > 0) {
      console.log("Already seeded");
      process.exit();

    }

    await Product.bulkCreate(products);


    console.log("🎉 Seed completed successfully");

    process.exit();
  } catch (error) {
    console.log("❌ ERROR:", error);
  }
};

seed(); // 🔥 هذا أهم سطر

    console.log("✅ Seeded Successfully");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

