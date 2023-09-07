// Router()
const router = require('express').Router();

// Middlewares
const multer = require('multer');
const storage = multer.memoryStorage(); // Utilisez memoryStorage pour stocker l'image en mémoire
const upload = multer({ storage });
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const { validateUser } = require('../middlewares/validations/userValidation');
const authentication = require('../middlewares/authentication');

// Contrôleur
const ArticleController = require('../controllers/ArticleController');

// CREATE
router.post('/', upload.single('image'), authentication, trimmer, validateUser, sanitizer, ArticleController.createArticle);

// READ
router.get('/', ArticleController.getArticles);

module.exports = router;
