const Category = require("../modeles/categoryModel");
const isCategoryName = require("../tools/isCategoryName");
const isDescription = require("../tools/isDescription");

const createCategory = async (req, res, next) => {
  // console.log('Received form data:', req.body);
  const newCategory = {
    category: req.body.category,
    description: req.body.description,
    id_user: req.user.id_user,
  };
  try {
    if(!isCategoryName(newCategory.category)){
      throw new Error("Le nom de la category doit contenir entre 2 et 15 caractères");
    }
    if(!isDescription(newCategory.description)){
      throw new Error("Veuillez renseigner une description");
    }

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
    const id_user = req.params.id_user;
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
const getCategoriesConnected = async (req, res) => {
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

const deleteCategory = async (req, res) => {
  try {
    const id_category = req.params.id_category;

    await Category.remove(id_category);
    res.status(200).json({ message: `Categorie #${id_category} deleted` });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
    createCategory,
    getCategories,
    getCategoriesConnected,
    deleteCategory
};
