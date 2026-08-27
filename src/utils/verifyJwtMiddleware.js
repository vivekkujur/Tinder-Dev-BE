const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

const verifyJWt = async (req, res, next) => {
  try {
    const cookie = req.cookies;

    const { accessToken } = cookie;
    console.log(accessToken);
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const decoded = jwt.verify(accessToken, process.env.TOKEN_SECRET);
    const { _id } = decoded;
    const user = await UserModel.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  verifyJWt,
};
