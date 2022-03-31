const ignoreFavicon = (req, res, next) => {
  if (req.path === '/favicon.ico') {
    res.status(204).end();
  }

  next();
};

module.exports = ignoreFavicon;
