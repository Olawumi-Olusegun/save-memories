const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
      title: { type: String, required: true, unique: true },
      message: { type: String, required: true },
      creator: { type: String, required: true },
      tags: { type: [String] },
      selectedFile: { type: String, required: true, default: "image.jpg" },
      likeCount: { type: Array },
}, { timestamps: true });


module.exports = mongoose.model('Memory', memorySchema);