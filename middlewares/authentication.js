require("dotenv").config();
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    // const token = req.cookies.token;
    const authHeader = req.header("Authorization");
    // console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;
    

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send('NOT_AUTHENTICATED');
  }
};

module.exports = authentication;
