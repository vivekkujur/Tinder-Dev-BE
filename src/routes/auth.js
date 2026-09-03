const express = require("express");
const { validateSignupData } = require("../helper/validate");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyJWt } = require("../utils/verifyJwtMiddleware");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //validate request
    validateSignupData(req);
    // encrypt password
    const hash = await bcrypt.hash(password, 10);

    const user = new UserModel({ firstName, lastName, email, password: hash });

    await user.save();
    res.send("user created successfully");
  } catch (err) {
    res.status(400).send("Error saving user to database. " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const getEmailId = req.body.email;
  const password = req.body.password;

  try {
    const user = await UserModel.findOne({ email: getEmailId });
    if (user == null) {
      res.status(400).send("User not registered , please signup");
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

      if (isPasswordMatch) {
        const data = {
          message: "Login successful",
          accessToken: token,
        };
        res.cookie("accessToken", token);
        res.send(data);
      } else {
        res.status(400).send("User not registered , please signup");
      }
    }
  } catch (err) {
    res.status(400).send("Something whent wrong");
  }
});

authRouter.get("/logout", (req, res) => {
  try {
    // res.clearCookie("accessToken");

    res.cookie("accessToken", null, {
      expires: new Date(Date.now()),
    });
    res.send("User logout successfully");
  } catch (e) {
    res.status(400).send("User not registered , please signup. " + e.message);
  }
});
module.exports = authRouter;
