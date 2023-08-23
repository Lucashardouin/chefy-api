const User = require('../modeles/userModel');

const createUser = async (req, res) => {
    try {
      const checkUsernameUnicity = await User.findByUsername(req.body.username);
      if (checkUsernameUnicity) {
        return res.status(401).json({ message: 'Username already taken' });
      }
  
      const checkEmailUnicity = await User.findByEmail(req.body.email);
      if (checkEmailUnicity) {
        return res.status(401).json({ message: 'Email address already taken' });
      }
  
      await User.create(req.body);
      return res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  };
  
  const getUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      if (users) {
        // Créer un nouveau tableau d'utilisateurs sans le champ 'mdp'
        const usersWithoutPassword = users.map(user => {
          const { mdp, ...userWithoutPassword } = user;
          return userWithoutPassword;
      });

      return res.status(200).json(usersWithoutPassword);
      } else {
        res.status(404).json({ message: 'No users found.' });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  };
  
  const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!isNaN(id)) {
            const user = await User.findById(id);
            
            if (user) {
                const { mdp, ...userWithoutPassword } = user;
                return res.status(200).json(userWithoutPassword);
            } else {
                return res.status(404).json({ message: `User #${id} not found` });
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
          const checkUsernameUnicity = await User.findByUsername(req.body.username);
          if (checkUsernameUnicity) {
            return res.status(401).json({ message: 'Username already taken' });
          }
        }
  
        if (req.body.email) {
          const checkEmailUnicity = await User.findByEmail(req.body.email);
          if (checkEmailUnicity) {
            return res.status(401).json({ message: 'Email address already taken' });
          }
        }
  
        const existingUser = await User.findById(id);
  
        if (!existingUser) {
          return res.status(404).json({ message: `User #${id} not found` });
        } else {
          await User.update(id, req.body);
  
          return res.status(200).json({ message: 'Update successful' });
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
    updateUser,
    deleteUser
  };
  
  // Gérer les actions liées aux réputations des utilisateurs (likes et dislikes)
  // Ajouter Skill et social network