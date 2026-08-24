const adminAuth = (req, res, next) => {
  console.log("adimin call is getting checked ");
  const toeken = "xyz";
  const isAuth = toeken === "xyz";
  if (!isAuth) {
    res.status(401).send("unauthorized user");
  } else {
    console.log("authorization is getting checked ");
    next();
  }
};

module.exports = {
  adminAuth,
};
