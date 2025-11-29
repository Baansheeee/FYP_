const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authmiddleware");
const {
  createLecture,
  getAllLectures,
  updateLecture,
  deleteLecture,
} = require("../controllers/lectureController");

const router = express.Router();

// Use your helper upload instead of rewriting multer config
const { upload } = require("../helpers/fileUpload");

// --------------------------- ROUTES ---------------------------

// Create lecture (admin only) — supports file or URL
router.post(
  "/create",
  requireSignIn,
  isAdmin,
  upload.single("file"), // field name "file" for frontend
  createLecture
);

// Get all lectures (public)
router.get("/", getAllLectures);

// Update lecture (admin only) — file or URL
router.put(
  "/:id",
  requireSignIn,
  isAdmin,
  upload.single("file"),
  updateLecture
);

// Delete lecture (admin only)
router.delete("/:id", requireSignIn, isAdmin, deleteLecture);

module.exports = router;
