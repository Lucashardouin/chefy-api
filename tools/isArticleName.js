function isArticleName(articleName) {
  if (!articleName || articleName.length < 2 || articleName.length > 15) {
    return false;
  }
  return true;
}

module.exports = isArticleName;
