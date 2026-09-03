const express = require("express");
const { verifyJWt } = require("../utils/verifyJwtMiddleware");
const UserModel = require("../models/user");
const ConnectionReqModel = require("../models/connectinRequest");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userId",
  verifyJWt,
  async (req, res) => {
    try {
      const allowedStatus = ["ignored", "interested"];

      const fromUser = req.user;
      const fromUserId = fromUser._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status, please use 'ignored' or 'interested'");
      } else if (fromUserId.toString() === toUserId) {
        throw new Error("You cannot send a connection request to yourself");
      }
      const connectionRequestData = await ConnectionReqModel.findOne({
        fromUserId,
        toUserId,
      });

      if (connectionRequestData) {
        throw new Error("Connection request already sent to this user");
      }

      const connectionRequest = new ConnectionReqModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.send({
        message: "Connection request sent successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("Something whent wrong : " + err.message);
    }
  }
);
module.exports = requestRouter;
