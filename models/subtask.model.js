const mongoose = require("mongoose");

const Subtask = new mongoose.Schema(
  {
    uuid: { type: String, required: true },
    user_uuid: { type: String, required: true },
    task_id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String },
    data: { type: Array },
  },
  { collection: "subtask-data" }
);

const model = mongoose.model("SubtaskData", Subtask);

module.exports = model;
