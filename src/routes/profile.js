const express = require("express");
const { verifyJWt } = require("../utils/verifyJwtMiddleware");
const UserModel = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/profile", verifyJWt, async (req, res, next) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Something whent wrong : " + err.message);
  }
});
module.exports = profileRouter;
