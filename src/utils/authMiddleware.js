const adminAuth = (req, res, next) => {
  const toeken = "xyz";
  const isAuth = toeken === "xyz";
  if (!isAuth) {
    res.status(401).send("unauthorized user");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
