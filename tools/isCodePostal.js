function isCodePostal(codePostal) {
  const regexCodePostal = /^[0-9]{5}$/;
  if (!codePostal || !regexCodePostal.test(codePostal)) {
    return false;
  }
  return true;
}

module.exports = isCodePostal;
