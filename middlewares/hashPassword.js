require('dotenv').config();
const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

const hashPassword = (req, res, next) => {
  const { mdp } = req.body;

  if (mdp) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return res.status(500).json({ error: 'Error occured during password hash.' });
      }

      bcrypt.hash(mdp, salt, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: 'Error occured during password hash.' });
        }

        req.body.mdp = hash;

        next();
      });
    });
  } else {
    next();
  }
};

module.exports = hashPassword;
