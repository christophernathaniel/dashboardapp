const mongoose = require("mongoose");

const Card = new mongoose.Schema(
  {
    uuid: { type: String, required: true },
    user_uuid: { type: String, required: true },
    name: { type: String, required: true },
    data: { type: Array },
  },
  { collection: "card-data" }
);

const model = mongoose.model("CardData", Card);

module.exports = model;
