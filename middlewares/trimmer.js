module.exports = (req, res, next) => {
  for (const [key, value] of Object.entries(req.body)) {
    if (typeof value === 'string') req.body[key] = value.trim();
  }
  next();
};
