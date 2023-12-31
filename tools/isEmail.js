function isEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email) || !email) {
    return false;
  }
  return true;
}

module.exports = isEmail;
