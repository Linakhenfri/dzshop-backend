require("dotenv").config();

const sequelize = require("./config/database");
const Product = require("./models/Product");

// 🔥 20 PRODUCTS EXACTLY
const products = [
  { title: "iPhone 13", price: 900, description: "Apple smartphone", category: "electronics", stock: 10 },
  { title: "Samsung S21", price: 800, description: "Android smartphone", category: "electronics", stock: 15 },
  { title: "HP Laptop", price: 1200, description: "Powerful laptop", category: "electronics", stock: 5 },
  { title: "Dell Laptop", price: 1100, description: "Work laptop", category: "electronics", stock: 7 },
  { title: "Headphones", price: 100, description: "Wireless headphones", category: "electronics", stock: 20 },

  { title: "T-shirt", price: 25, description: "Cotton t-shirt", category: "clothing", stock: 30 },
  { title: "Jeans", price: 60, description: "Blue jeans", category: "clothing", stock: 25 },
  { title: "Jacket", price: 120, description: "Winter jacket", category: "clothing", stock: 10 },
  { title: "Dress", price: 80, description: "Elegant dress", category: "clothing", stock: 12 },
  { title: "Sneakers", price: 90, description: "Sport shoes", category: "clothing", stock: 18 },

  { title: "Chair", price: 45, description: "Wooden chair", category: "furniture", stock: 20 },
  { title: "Table", price: 150, description: "Dining table", category: "furniture", stock: 5 },
  { title: "Sofa", price: 500, description: "Comfortable sofa", category: "furniture", stock: 3 },
  { title: "Bed", price: 700, description: "King size bed", category: "furniture", stock: 4 },
  { title: "Lamp", price: 30, description: "Desk lamp", category: "furniture", stock: 15 },

  { title: "Watch", price: 200, description: "Luxury watch", category: "accessories", stock: 10 },
  { title: "Bag", price: 75, description: "Leather bag", category: "accessories", stock: 14 },
  { title: "Sunglasses", price: 50, description: "Stylish sunglasses", category: "accessories", stock: 20 },
  { title: "Belt", price: 35, description: "Leather belt", category: "accessories", stock: 25 },
  { title: "Perfume", price: 120, description: "Fragrance", category: "accessories", stock: 8 }
];

const seed = async () => {
  try {
    console.log("🚀 SEED STARTED");

    await sequelize.authenticate();
    console.log("✅ DB connected");

    // 🔥 IMPORTANT FIX: ALWAYS RESET TABLE
    await sequelize.sync({ force: true });
    console.log("📦 Table reset done");

    await Product.bulkCreate(products);

    const count = await Product.count();
    console.log("🎉 PRODUCTS INSERTED:", count);

    process.exit(0);

  } catch (error) {
    console.log("❌ SEED ERROR:", error);
    process.exit(1);
  }
};

seed();
