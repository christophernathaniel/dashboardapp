const mongoose = require("mongoose");

const Bookmark = new mongoose.Schema(
  {
    uuid: { type: String, required: true },
    user_uuid: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String },
    url: { type: String },
    active: { type: Boolean, default: false },
    color: { type: String },
    data: { type: Array },
  },
  { collection: "bookmark-data" }
);

const model = mongoose.model("BookmarkData", Bookmark);

module.exports = model;
