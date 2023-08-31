const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modeles/userModel');
require('dotenv').config();

const login = async (req, res, next) => {
  const user = {
    username: req.body.username,
    mdp: req.body.mdp,
  };
  try {
    const userFromDB = await User.findByUsername(user.username);
    if (!userFromDB) {
      throw new Error("Username not found");
    } else {
      const passwordCheck = await bcrypt.compare(user.mdp, userFromDB.mdp);
      if (!passwordCheck) {
        throw new Error("Invalid credentials");
      } else {
        const token = createJwtToken(user)
        console.log('login succesful');
        return res.status(200).send({ token });
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};

const logout = (req, res) => {
  return res.clearCookie('token').status(200).json({ message: 'Logout' });
};

const getTokenData = (req, res) => {
  return res.json({
    id_user: req.user.id_user,
    username: req.user.username,
    role: req.user.role
  });
};

const createJwtToken = (user) => {
  return jwt.sign(
    {
      id_user: user.id_user,
      username: user.username,
      role: user.role
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: parseInt(process.env.JWT_EXPIRATION)
    }
  );
}



module.exports = {
  login,
  logout,
  getTokenData
};
