// Router()
const router = require('express').Router();

// Middlewares
const multer = require('multer');
const storage = multer.memoryStorage(); // Utilisez memoryStorage pour stocker l'image en mémoire
const upload = multer({ storage });
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const hashPassword = require('../middlewares/hashPassword');
const authentication = require('../middlewares/authentication');
const { userAuthorization } = require('../middlewares/authorization');
const { validateUser } = require('../middlewares/validations/userValidation');

// Contrôleur
const UserController = require('../controllers/UserController');

// CREATE
router.post('/', upload.single('image'), trimmer, validateUser, sanitizer, hashPassword, UserController.createUser);

// READ
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);

// UPDATE
router.put(
  '/:id',
  authentication,
  userAuthorization,
  trimmer,
  validateUser,
  sanitizer,
  hashPassword,
  UserController.updateUser
);

// DELETE
// router.delete('/:id', authentication, userAuthorization, UserController.deleteUser);

module.exports = router;
