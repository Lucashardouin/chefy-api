const User = require("../modeles/userModel");
const isUsername = require('../tools/isUsername');
const isEmail = require('../tools/isEmail');
const isAdresse = require('../tools/isAdresse');
const isVille = require('../tools/isVille');
const isCodePostal = require('../tools/isCodePostal');
const isRestaurantName = require("../tools/isRestaurantName");

const createUser = async (req, res, next) => {
  // console.log('Received form data:', req.body);
  const newUser = {
    restaurant_name: req.body.restaurant_name,
    username: req.body.username,
    email: req.body.email,
    mdp: req.body.mdp,
    adresse: req.body.adresse,
    ville: req.body.ville,
    code_postal: req.body.code_postal,
    image: req.file.buffer, // Utilisez le buffer de l'image
    role: req.body.role,
  };
  try {
    if (!isRestaurantName(newUser.restaurant_name)) {
      throw new Error("Le nom du restaurant doit contenir entre 3 et 15 caractères");
    }

    if (
      !isUsername(newUser.username)
    ) {
      throw new Error(
        "Le nom d'utilisateur doit contenir 3 à 15 caractères et ne doit pas contenir d'espace"
      );
    }

    if (!isEmail(newUser.email)) {
      throw new Error("Invalid email formprrat");
    }

    if (!isAdresse) {
      throw new Error("Veuillez renseigner une adresse");
    }

    if (!isVille) {
      throw new Error("Veuillez renseigner une ville");
    }

    if (!isCodePostal) {
      throw new Error("Code postal invalide");
    }

    if (!newUser.image) {
      throw new Error("Veuillez renseigner une image");
    }

    const checkUsernameUnicity = await User.findByUsername(newUser.username);
    if (checkUsernameUnicity) {
      throw new Error("Username already taken");
    }

    const checkEmailUnicity = await User.findByEmail(newUser.email);
    if (checkEmailUnicity) {
      throw new Error("Email already taken");
    }
    await User.create(newUser);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    // throw new Error(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users) {
      // Créer un nouveau tableau d'utilisateurs sans le champ 'mdp'
      const usersWithoutPassword = users.map((user) => {
        const { mdp, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      return res.status(200).json(usersWithoutPassword);
    } else {
      res.status(404).json({ message: "No users found." });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getUserById = async (req, res) => {
  try {
    // console.log(id_user);
    // console.log(req.params);
    const id_user = req.params.id_user;

    if (!isNaN(id_user)) {
      const user = await User.findById(id_user);

      if (user) {
        const { mdp, ...userWithoutPassword } = user;
        return res.status(200).json(userWithoutPassword);
      } else {
        return res.status(404).json({ message: `User #${id_user} not found` });
      }
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const getUserConnected = async (req, res) => {
  try {
    // console.log(id_user);
    // console.log(req.params);
    const id_user = req.user.id_user;

    if (!isNaN(id_user)) {
      const user = await User.findById(id_user);

      if (user) {
        const { mdp, ...userWithoutPassword } = user;
        return res.status(200).json(userWithoutPassword);
      } else {
        return res.status(404).json({ message: `User #${id_user} not found` });
      }
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!isNaN(id)) {
      if (req.body.username) {
        const checkUsernameUnicity = await User.findByUsername(
          req.body.username
        );
        if (checkUsernameUnicity) {
          return res.status(401).json({ message: "Username already taken" });
        }
      }

      if (req.body.email) {
        const checkEmailUnicity = await User.findByEmail(req.body.email);
        if (checkEmailUnicity) {
          return res
            .status(401)
            .json({ message: "Email address already taken" });
        }
      }

      const existingUser = await User.findById(id);

      if (!existingUser) {
        return res.status(404).json({ message: `User #${id} not found` });
      } else {
        await User.update(id, req.body);

        return res.status(200).json({ message: "Update successful" });
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!isNaN(id)) {
      const user = await User.findById(id);
      if (user) {
        await User.remove(id);
        res.status(200).json({ message: `User #${id} deleted` });
      } else {
        res.status(404).json({ message: `User #${id} not found` });
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserConnected,
  updateUser,
  deleteUser,
};

// Gérer les actions liées aux réputations des utilisateurs (likes et dislikes)
// Ajouter Skill et social network
