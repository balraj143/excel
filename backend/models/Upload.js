const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  filename: String,
  data: Array, // Parsed Excel JSON
  summary: String, // 🧠 AI-generated summary
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Upload", uploadSchema);
