const mongoose = require("mongoose");

const Code = new mongoose.Schema(
  {
    uuid: { type: String, required: true },
    user_uuid: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
    cardHolderName: { type: String },
    bank: { type: String },
    color: { type: String },
    data: { type: Array },
  },
  { collection: "code-data" }
);

const model = mongoose.model("CodeData", Code);

module.exports = model;
