const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modeles/userModel');
require('dotenv').config();

const login = async (req, res) => {
  try {
    const user = await User.findByUsername(req.body.username);
    if (!user) {
      return res.status(401).json({ message: 'Username not found' });
    } else {
      // console.log(user);
      const passwordCheck = await bcrypt.compare(req.body.mdp, user.mdp);
      if (!passwordCheck) {
        res.status(401).json({ message: 'Invalid credentials' });
      } else {
        const token = jwt.sign(
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

        // Stocker le token dans un cookie sécurisé et HTTPOnly
        return res
          .cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: parseInt(process.env.JWT_COOKIE_EXPIRATION)
          })
          .status(200)
          .json({
            message: 'Authenticated'
          });
      }
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
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

module.exports = {
  login,
  logout,
  getTokenData
};
