function isUsername(username) {
  if (
    !username ||
    username.length < 3 ||
    username.length > 15 ||
    !/^\S+$/.test(username)
  ) {
    return false;
  }
  return true;
}

module.exports = isUsername;
