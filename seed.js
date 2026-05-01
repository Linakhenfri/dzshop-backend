const seed = async () => {
  try {
    await sequelize.sync(); // ❌ بدون force

    const count = await Product.count();
    if (count > 0) {
      console.log("Already seeded");
      process.exit();
    }

    await Product.bulkCreate(products);

    console.log("✅ Seeded Successfully");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
