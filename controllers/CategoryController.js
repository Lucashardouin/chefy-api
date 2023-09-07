const Category = require("../modeles/categoryModel");

const createCategory = async (req, res, next) => {
  // console.log('Received form data:', req.body);
  const newCategory = {
    category: req.body.category,
    description: req.body.description,
    id_user: req.user.id_user,
  };
  try {
    const result = await Category.create(newCategory);
    const newCategoryId = String(result.insertId); // Obtenez l'ID généré automatiquement
    res.status(200).json({
      message: "Category created successfully",
      id_category: newCategoryId, // Inclure l'ID dans la réponse JSON
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    // throw new Error(error);
  }
};

const getCategories = async (req, res) => {
  try {
    const id_user = req.user.id_user;
    const categories = await Category.findAll(id_user);
    if (categories) {
      return res.status(200).json(categories);
    } else {
      res.status(404).json({ message: "No categories found." });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
    createCategory,
    getCategories
};
