const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    description: { type: String, default: "" },

    // File Details
    fileUrl: { type: String, default: "" },   // URL of uploaded file or external URL
    fileName: { type: String, default: "" },  // Original name
    fileType: { type: String, default: "" },  // pdf, png, mp4, docx etc.

    duration: { type: Number, default: 0 },

    uploadedBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lecture", lectureSchema);
