const sequelize = require("./config/database");
const Product = require("./models/Product");

const products = [
  { title: "Phone", price: 500, description: "Smartphone with good performance" },
  { title: "Laptop", price: 1200, description: "Powerful laptop for work and study" },
  { title: "T-shirt", price: 20, description: "Comfortable cotton t-shirt" },
  { title: "Shoes", price: 80, description: "Stylish and comfortable shoes" },

  { title: "Headphones", price: 60, description: "Wireless headphones" },
  { title: "Keyboard", price: 40, description: "Mechanical keyboard" },
  { title: "Mouse", price: 25, description: "Ergonomic mouse" },
  { title: "Monitor", price: 300, description: "24-inch Full HD monitor" },

  { title: "Jacket", price: 100, description: "Warm winter jacket" },
  { title: "Jeans", price: 50, description: "Classic blue jeans" },
  { title: "Dress", price: 70, description: "Elegant dress" },
  { title: "Cap", price: 15, description: "Casual cap" },

  { title: "Bag", price: 45, description: "Leather bag" },
  { title: "Watch", price: 150, description: "Luxury watch" },
  { title: "Sunglasses", price: 35, description: "UV protection sunglasses" },
  { title: "Belt", price: 20, description: "Leather belt" },

  { title: "Tablet", price: 400, description: "Android tablet" },
  { title: "Charger", price: 15, description: "Fast charger" },
  { title: "Speaker", price: 90, description: "Bluetooth speaker" },
  { title: "Power Bank", price: 30, description: "Portable power bank" }
];

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // ⚠️ يمسح كلش
    await Product.bulkCreate(products);

    console.log("✅ Database Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.log("❌ Error:", error);
  }
};

seed();
 