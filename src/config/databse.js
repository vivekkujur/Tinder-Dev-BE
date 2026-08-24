const { ConnectionClosedEvent } = require("mongodb");
const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://namasteDev:Qwerty987@cluster0.okhnsi8.mongodb.net/devTinder?appName=Cluster0"
  );
};

module.exports = connectDb;
