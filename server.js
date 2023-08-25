// Importer les modules
const express = require('express');
const dotenv = require('dotenv').config();
const multer = require('multer');
const storage = multer.memoryStorage(); // Utilisez memoryStorage pour stocker l'image en mémoire
const upload = multer({ storage: storage });
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const UserController = require('./controllers/userController');
// Créer une instance d'Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:8081' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Définir une route de test
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Backend works!' });
});
//

app.post('/api/users/', upload.single('image'), async (req, res) => {
  try {
    console.log('Received form data:', req.body);
    console.log('Received image:', req.file);

    // Créez un objet newUser en utilisant les données reçues du formulaire
    const newUser = {
      restaurant_name: req.body.restaurant_name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      adresse: req.body.adresse,
      ville: req.body.ville,
      code_postal: req.body.code_postal,
      image: req.file.buffer, // Utilisez le buffer de l'image
      role: req.body.role,
    };

    // Utilisez la fonction UserController.createUser pour insérer newUser dans la base de données
    const result = await UserController.createUser(newUser);

    // Envoyez une réponse en cas de succès
    res.status(200).json({ message: 'User created successfully', result });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});


app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use(errorHandler);


  app.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
  });

