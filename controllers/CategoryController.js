const Category = require("../modeles/categoryModel");

const createCategory = async (req, res, next) => {
  // console.log('Received form data:', req.body);
  const newCategory = {
    category: req.body.category,
  };
  try {
    await Category.create(newCategory);
    res.status(200).json({ message: "Category created successfully" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    // throw new Error(error);
  }
};

module.exports = {
    createCategory
};
