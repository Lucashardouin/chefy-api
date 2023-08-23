require('dotenv').config();
const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
  try {
    const token = req.cookies.token;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
};

module.exports = authentication;
