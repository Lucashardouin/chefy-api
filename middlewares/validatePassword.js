const validatePassword = (req, res, next) => {
  const newUser = {
    mdp: req.body.mdp,
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,20}$/;
  if (!passwordRegex.test(newUser.mdp) || !newUser.mdp) {
    return res.status(400).json({
      message:
        "Password must be 8-20 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (#, @, $, !, %, *, ?, or &).",
    });
  }

  // Si la validation réussit, appelez next() pour passer au middleware suivant (hashPassword)
  next();
};

module.exports = validatePassword;
