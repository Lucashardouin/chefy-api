const Article = require("../modeles/articleModel");
const isArticleName = require("../tools/isArticleName");
const isPrix = require("../tools/isPrix");
const isDescription = require("../tools/isDescription");
const isCategoryId = require("../tools/isCategoryId");

const createArticle = async (req, res, next) => {
  // console.log('Received form data:', req.body);
  const newArticle = {
    article_name: req.body.article_name,
    prix: req.body.prix,
    description: req.body.description,
    image: req.file.buffer,
    id_user: req.user.id_user,
    id_category: req.body.id_category,
  };
  try {
    if (!isArticleName(newArticle.article_name)) {
      throw new Error(
        "Le nom de l'article doit contenir entre 2 et 15 caractères"
      );
    }
    if (!isPrix(newArticle.prix)) {
      throw new Error("Prix invalide");
    }
    if (!isDescription(newArticle.description)) {
      throw new Error("Veuillez renseigner une description");
    }
    if (!newArticle.image) {
      throw new Error("Veuillez renseigner une image");
    }
    if (!isCategoryId(newArticle.id_category)) {
      throw new Error("Categorie invalide");
    }

    await Article.create(newArticle);
    res.status(200).json({ message: "Article created successfully" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    // throw new Error(error);
  }
};

const updateArticle = async (req, res) => {
  const id_article = req.params.id_article;

  const updatedArticle = {
    article_name: req.body.article_name,
    prix: req.body.prix,
    description: req.body.description,
    image: req.file.buffer, // Si vous souhaitez mettre à jour l'image
    id_category: req.body.id_category,
  };

  try {
    if (!isArticleName(updatedArticle.article_name)) {
      throw new Error(
        "Le nom de l'article doit contenir entre 2 et 15 caractères"
      );
    }
    if (!isPrix(updatedArticle.prix)) {
      throw new Error("Prix invalide");
    }
    if (!isDescription(updatedArticle.description)) {
      throw new Error("Veuillez renseigner une description");
    }
    if (!isCategoryId(updatedArticle.id_category)) {
      throw new Error("Catégorie invalide");
    }
    if (!updatedArticle.image) {
      throw new Error("Veuillez renseigner une image");
    }

    // Mettre à jour l'article en utilisant son ID
    await Article.update(id_article, updatedArticle);

    res.status(200).json({ message: "Article updated successfully" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    if (articles) {
      return res.status(200).json(articles);
    } else {
      res.status(404).json({ message: "No articles found." });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const deleteArticle = async (req, res) => {
  try {
    const id_article = req.params.id_article;

    await Article.remove(id_article);
    res.status(200).json({ message: `User #${id_article} deleted` });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  createArticle,
  getArticles,
  updateArticle,
  deleteArticle,
};
