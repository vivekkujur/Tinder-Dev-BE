const express = require("express");
const { verifyJWt } = require("../utils/verifyJwtMiddleware");
const { validateUserEditData } = require("../helper/validate");
const UserModel = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/profile/view", verifyJWt, async (req, res, next) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Something whent wrong : " + err.message);
  }
});

profileRouter.patch("/profile/edit", verifyJWt, async (req, res, next) => {
  try {
    if (!validateUserEditData(req)) {
      throw new Error("Invalid edit request");
    }

    const user = req.user;

    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));

    await user.save();

    res.send(`${user.firstName}` + " your profile is updated successfuly");
  } catch (err) {
    res.status(400).send("Something whent wrong : " + err.message);
  }
});
module.exports = profileRouter;
