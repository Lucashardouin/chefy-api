function isPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,20}$/;
  if (!passwordRegex.test(password) || !password) {
    return false;
  } else {
    return true;
  }
}

module.exports = isPassword;
