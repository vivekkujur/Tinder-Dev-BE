const express = require("express");
const { verifyJWt } = require("../utils/verifyJwtMiddleware");
const UserModel = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRrequest", verifyJWt, async (req, res) => {
  try {
    const user = req.user;

    res.send("connection request sent successfully");
  } catch (err) {
    res.status(400).send("Something whent wrong : " + err.message);
  }
});
module.exports = requestRouter;
