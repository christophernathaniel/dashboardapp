const mongoose = require("mongoose");

const Card = new mongoose.Schema(
  {
    uuid: { type: String, required: true },
    user_uuid: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
    cardHolderName: { type: String },
    bank: { type: String },
    color: { type: String },
    data: { type: Array },
    totalInAccount: { type: String },
  },
  { collection: "card-data" }
);

const model = mongoose.model("CardData", Card);

module.exports = model;
