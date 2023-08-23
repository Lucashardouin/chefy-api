// Importer les modules
const express = require('express');
const dotenv = require('dotenv').config();
// const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
// Créer une instance d'Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


// Définir une route de test
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Backend works!' });
});
//

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use(errorHandler);



// Démarrer le serveur

// const pool = require('./db');
// async function test(){
//   let connection;
//   try{
//     connection = await pool.getConnection();
//     console.log('Connection réussie !');
//     // Faites ce que vous avez besoin de faire avec la connexion ici
//     // N'oubliez pas de libérer la connexion après utilisation
//     connection.release();
//   }catch(error){
//     console.error('Erreur lors du démarrage', error);
//     throw new Error("Erreur lors du démarrage: " + error.message);
//   }
// }
// test();

// console.log(connection);

  app.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
  });

