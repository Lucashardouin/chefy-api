// Router()
const router = require('express').Router();

// Middlewares
const multer = require('multer');
const path = require("path");
const storage = multer.memoryStorage(); // Utilisez memoryStorage pour stocker l'image en mémoire
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Vérifiez si l'extension du fichier est une image
    const filetypes = /jpeg|jpg|png|gif|webp/;
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
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const validatePassword = require('../middlewares/validatePassword');
const hashPassword = require('../middlewares/hashPassword');
const authentication = require('../middlewares/authentication');
const { userAuthorization } = require('../middlewares/authorization');
const { validateUser } = require('../middlewares/validations/userValidation');

// Contrôleur
const UserController = require('../controllers/UserController');

// CREATE
router.post('/', upload.single('image'), trimmer, validateUser, sanitizer, validatePassword, hashPassword, UserController.createUser);

// READ
// router.get('/', UserController.getUsers);
router.get('/:id_user', UserController.getUserById);
router.get('/', authentication, UserController.getUserConnected);

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
