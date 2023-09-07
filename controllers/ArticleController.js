const Article = require("../modeles/articleModel");

const createArticle = async (req, res, next) => {
  // console.log('Received form data:', req.body);
  const newArticle = {
    article_name: req.body.article_name,
    prix: req.body.prix,
    description: req.body.description,
    image: req.file.buffer,
    id_user: req.user.id_user,
    id_category: req.body.id_category
  };
  console.log(req.body);
  try {
    await Article.create(newArticle);
    res.status(200).json({ message: "Article created successfully" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    // throw new Error(error);
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

module.exports = {
  createArticle,
  getArticles,
};
