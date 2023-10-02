// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const { validateUser } = require('../middlewares/validations/userValidation');
const authentication = require('../middlewares/authentication');

// Contrôleur
const CategoryController = require('../controllers/CategoryController');

// CREATE
router.post('/', authentication, trimmer, validateUser, sanitizer, CategoryController.createCategory);

// READ
router.get('/:id_user', CategoryController.getCategories);
router.get('/', authentication, CategoryController.getCategoriesConnected);

// DELETE
router.delete('/:id_category', authentication, CategoryController.deleteCategory);

module.exports = router;
