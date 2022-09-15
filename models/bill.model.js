const mongoose = require("mongoose");

const Bill = new mongoose.Schema(
  {
    uuid: { type: String, required: true },
    card_uuid: { type: String, required: true },
    user_uuid: { type: String, required: true },
    data: { type: Array },
  },
  { collection: "bill-data" }
);

const model = mongoose.model("BillData", Bill);

module.exports = model;
