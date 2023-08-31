require('dotenv').config();
const { constants } = require("../constants");
const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

const hashPassword = async (req, res, next) => {
  const { mdp } = req.body
  if (mdp) {
    // return await bcrypt.hash(mdp, saltRounds); // https://www.npmjs.com/package/bcrypt
    req.body.mdp = await bcrypt.hash(mdp, saltRounds);
    next()
  } else {
    // throw new Error('Error occurred during password hash')
    res.send('Password field is empty').status(500);
  }
};

module.exports = hashPassword;

