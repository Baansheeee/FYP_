const Lecture = require("../models/lectureModel");
const fs = require("fs");
const path = require("path");

// Create Lecture — supports file upload & URL
const createLecture = async (req, res) => {
  try {
    const { title, description, fileUrl } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    let finalUrl = "";
    let fileName = "";
    let fileType = "";

    // CASE 1 — Uploaded file (Multer)
    if (req.file) {
      finalUrl = `/uploads/${req.file.filename}`;
      fileName = req.file.originalname;
      fileType = req.file.mimetype;
    }

    // CASE 2 — External URL
    else if (fileUrl) {
      finalUrl = fileUrl;
      fileName = fileUrl.split("/").pop();
      fileType = fileUrl.split(".").pop();
    }

    else {
      return res.status(400).json({
        success: false,
        message: "Either a file upload or file URL is required",
      });
    }

    const lecture = new Lecture({
      title,
      description: description || "",
      fileUrl: finalUrl,
      fileName,
      fileType,
      duration: 0,
    });

    await lecture.save();

    res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      lecture,
    });

  } catch (error) {
    console.error("Create Lecture Error:", error);
    res.status(500).json({ success: false, message: "Error creating lecture", error: error.message });
  }
};

// Get all lectures
const getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, lectures });
  } catch (error) {
    console.error("Get All Lectures Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching lectures",
      error: error.message,
    });
  }
};

// Update Lecture — file upload OR URL
const updateLecture = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, fileUrl } = req.body;

    const lecture = await Lecture.findById(id);
    if (!lecture) {
      return res.status(404).json({ success: false, message: "Lecture not found" });
    }

    if (title) lecture.title = title;
    if (description) lecture.description = description;
    if (duration) lecture.duration = duration;

    // CASE 1 — Replace with uploaded file
    if (req.file) {
      // remove old local file
      if (lecture.fileUrl.startsWith("/uploads/")) {
        const oldPath = path.join(__dirname, "..", lecture.fileUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      lecture.fileUrl = `/uploads/${req.file.filename}`;
      lecture.fileName = req.file.originalname;
      lecture.fileType = req.file.mimetype;
    }

    // CASE 2 — Replace with external URL
    else if (fileUrl) {
      if (lecture.fileUrl.startsWith("/uploads/")) {
        const oldPath = path.join(__dirname, "..", lecture.fileUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      lecture.fileUrl = fileUrl;
      lecture.fileName = fileUrl.split("/").pop();
      lecture.fileType = fileUrl.split(".").pop();
    }

    await lecture.save();

    res.status(200).json({
      success: true,
      message: "Lecture updated successfully",
      lecture,
    });

  } catch (error) {
    console.error("Update Lecture Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating lecture",
      error: error.message,
    });
  }
};

// Delete Lecture
const deleteLecture = async (req, res) => {
  try {
    const { id } = req.params;

    const lecture = await Lecture.findByIdAndDelete(id);
    if (!lecture) {
      return res.status(404).json({ success: false, message: "Lecture not found" });
    }

    // Delete file if stored locally
    if (lecture.fileUrl.startsWith("/uploads/")) {
      const filePath = path.join(__dirname, "..", lecture.fileUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.status(200).json({ success: true, message: "Lecture deleted successfully" });

  } catch (error) {
    console.error("Delete Lecture Error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting lecture",
      error: error.message,
    });
  }
};

module.exports = {
  createLecture,
  getAllLectures,
  updateLecture,
  deleteLecture,
};
