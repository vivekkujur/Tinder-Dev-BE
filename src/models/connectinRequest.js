const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["ignored", "interested", "accepeted", "rejected"],
      message: "{VALUE} is not supported status",
    },
  },
});

const ConnectionReqModel = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionReqModel;
