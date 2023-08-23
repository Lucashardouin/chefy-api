// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const authentication = require('../middlewares/authentication');

// Contrôleur
const AuthController = require('../controllers/AuthController');

router.post('/login', trimmer, sanitizer, AuthController.login);
router.get('/logout', authentication, AuthController.logout);
router.get('/data', authentication, AuthController.getTokenData);

module.exports = router;
