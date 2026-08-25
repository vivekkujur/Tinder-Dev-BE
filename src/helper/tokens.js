const generateJWT = (user) => {
  jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);
};
