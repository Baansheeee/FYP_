const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authmiddleware");
const {
    createPost,
    getAllPosts,
    getPostById,
    addReply,
    likePost,
    likeReply,
    updatePostStatus,
    togglePinPost,
    deletePost,
    getReply,
    getReplyById
} = require("../controllers/communityController");

const router = express.Router();

// ========================= PUBLIC ROUTES =========================

// Get all community posts (public)
router.get("/", getAllPosts);

// Get single post by ID (public)
router.get("/:id", getPostById);

// ========================= AUTHENTICATED ROUTES =========================

// Create a new post (authenticated users)
router.post("/create", requireSignIn, createPost);

// Add reply to post (authenticated users)
router.post("/:id/reply", requireSignIn, addReply);

// Like a post (authenticated users)
router.put("/:id/like", requireSignIn, likePost);

// Like a reply (authenticated users)
router.put("/:postId/reply/:replyId/like", requireSignIn, likeReply);

// Update post status (authenticated users - own posts only)
router.put("/:id/status", requireSignIn, updatePostStatus);

// Delete post (authenticated users - own posts, or admin)
router.delete("/:id", requireSignIn, deletePost);

router.get('/posts/:postId/replies/:replyId', requireSignIn, getReply);

// ========================= ADMIN ROUTES =========================

// Pin/Unpin post (admin only)
router.put("/:id/pin", requireSignIn, isAdmin, togglePinPost);

module.exports = router;
