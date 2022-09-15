const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    data: { type: Array },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
