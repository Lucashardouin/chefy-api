// Router()
const router = require("express").Router();

// Middlewares
const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage(); // Utilisez memoryStorage pour stocker l'image en mémoire
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Vérifiez si l'extension du fichier est une image
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true); // Autorisez le fichier
    } else {
      return cb("Erreur : Le fichier doit être une image valide.");
    }
  },
});
const trimmer = require("../middlewares/trimmer");
const sanitizer = require("../middlewares/sanitizer");
const { validateUser } = require("../middlewares/validations/userValidation");
const authentication = require("../middlewares/authentication");

// Contrôleur
const ArticleController = require("../controllers/ArticleController");

// CREATE
router.post(
  "/",
  upload.single("image"),
  authentication,
  trimmer,
  sanitizer,
  ArticleController.createArticle
);

// READ
router.get("/", ArticleController.getArticles);

// UPDATE
router.put(
  "/:id_article",
  upload.single("image"),
  authentication,
  trimmer,
  sanitizer,
  ArticleController.updateArticle
);

// DELETE
router.delete('/:id_article', authentication, ArticleController.deleteArticle);

module.exports = router;
