const CommunityPost = require("../models/communityPost");

// Create a new community post
const createPost = async (req, res) => {
    try {
        const {
            title,
            category,
            content,
            tags,
            userName: bodyUserName,
            userEmail: bodyUserEmail,
        } = req.body;


        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Title and content are required" });
        }

        const { userName: tokenUserName, userEmail: tokenUserEmail } = req.user || {};
        const finalUserName = tokenUserName || bodyUserName || "Anonymous";
        const finalUserEmail = tokenUserEmail || bodyUserEmail || "no-email@example.com";

        const post = new CommunityPost({
            title,
            category: category || "General",
            content,
            tags: tags || [],
            userName: finalUserName,
            userEmail: finalUserEmail,
        });

        await post.save();

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post,
        });


    } catch (error) {
        console.error("Create Post Error:", error);
        res.status(500).json({ success: false, message: "Error creating post", error: error.message });
    }
};

// Get all community posts with pagination
const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category;
        const status = req.query.status;


        let query = {};
        if (category && category !== "all") query.category = category;
        if (status && status !== "all") query.status = status;

        const posts = await CommunityPost.find(query)
            .sort({ isPinned: -1, createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await CommunityPost.countDocuments(query);

        res.status(200).json({
            success: true,
            posts,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });


    } catch (error) {
        console.error("Get All Posts Error:", error);
        res.status(500).json({ success: false, message: "Error fetching posts", error: error.message });
    }
};

// Get single post and increment views
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;


        const post = await CommunityPost.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.status(200).json({ success: true, post });


    } catch (error) {
        console.error("Get Post Error:", error);
        res.status(500).json({ success: false, message: "Error fetching post", error: error.message });
    }
};

// Add reply/comment to post
const addReply = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, userName: bodyUserName, userEmail: bodyUserEmail } = req.body;


        if (!content) {
            return res.status(400).json({ success: false, message: "Reply content is required" });
        }

        const post = await CommunityPost.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const { userName: tokenUserName, userEmail: tokenUserEmail } = req.user || {};
        const finalUserName = tokenUserName || bodyUserName || "Anonymous";
        const finalUserEmail = tokenUserEmail || bodyUserEmail || "no-email@example.com";

        const reply = {
            userName: finalUserName,
            userEmail: finalUserEmail,
            content,
        };

        post.replies.push(reply);
        await post.save();

        res.status(201).json({
            success: true,
            message: "Reply added successfully",
            post,
        });

    } catch (error) {
        console.error("Add Reply Error:", error);
        res.status(500).json({ success: false, message: "Error adding reply", error: error.message });
    }
};

// Helper function to get a reply by ID
const getReplyById = (post, replyId) => {
    return post.replies.id(replyId);
};

// Get a single reply by post ID and reply ID
const getReply = async (req, res) => {
    try {
        const { postId, replyId } = req.params;

        const post = await CommunityPost.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const reply = getReplyById(post, replyId);
        if (!reply) {
            return res.status(404).json({ success: false, message: "Reply not found" });
        }

        res.status(200).json({ success: true, reply });
    } catch (error) {
        console.error("Get Reply Error:", error);
        res.status(500).json({ success: false, message: "Error fetching reply", error: error.message });
    }
};

const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userEmail = req.user?.userEmail || req.body?.userEmail || "no-email@example.com";

        const post = await CommunityPost.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Initialize likedBy array if it doesn't exist
        if (!post.likedBy) post.likedBy = [];

        // Check if user already liked
        if (post.likedBy.includes(userEmail)) {
            // Unlike the post
            post.likedBy = post.likedBy.filter((email) => email !== userEmail);
        } else {
            // Like the post
            post.likedBy.push(userEmail);
        }

        post.likes = post.likedBy.length;
        await post.save();

        res.status(200).json({ success: true, post, message: "Post updated" });
    } catch (error) {
        console.error("Like Post Error:", error);
        res.status(500).json({ success: false, message: "Error liking post", error: error.message });
    }
};

// Like a reply
const likeReply = async (req, res) => {
    try {
        const { postId, replyId } = req.params;
        const userEmail = req.user?.userEmail || req.body?.userEmail || "no-email@example.com";

        const post = await CommunityPost.findById(postId);
        if (!post) return res.status(404).json({ success: false, message: "Post not found" });

        const reply = post.replies.id(replyId);
        if (!reply) return res.status(404).json({ success: false, message: "Reply not found" });

        // Initialize likedBy array if it doesn't exist
        if (!reply.likedBy) reply.likedBy = [];

        // Check if user already liked
        if (reply.likedBy.includes(userEmail)) {
            // Unlike the reply
            reply.likedBy = reply.likedBy.filter((email) => email !== userEmail);
        } else {
            // Like the reply
            reply.likedBy.push(userEmail);
        }

        reply.likes = reply.likedBy.length;

        await post.save();
        res.status(200).json({ success: true, post, message: "Reply updated" });
    } catch (error) {
        console.error("Like Reply Error:", error);
        res.status(500).json({ success: false, message: "Error liking reply", error: error.message });
    }
};

// Update post status
const updatePostStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;


        if (!["open", "closed", "solved"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const post = await CommunityPost.findByIdAndUpdate(id, { status }, { new: true });
        if (!post) return res.status(404).json({ success: false, message: "Post not found" });

        res.status(200).json({ success: true, post });


    } catch (error) {
        console.error("Update Post Status Error:", error);
        res.status(500).json({ success: false, message: "Error updating post", error: error.message });
    }
};

// Pin/Unpin post (admin only)
const togglePinPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await CommunityPost.findById(id);
        if (!post) return res.status(404).json({ success: false, message: "Post not found" });

        post.isPinned = !post.isPinned;
        await post.save();

        res.status(200).json({ success: true, post });


    } catch (error) {
        console.error("Toggle Pin Post Error:", error);
        res.status(500).json({ success: false, message: "Error pinning post", error: error.message });
    }
};

// Delete post (admin or post author)
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;


        const post = await CommunityPost.findById(id);
        if (!post) return res.status(404).json({ success: false, message: "Post not found" });

        await CommunityPost.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Post deleted successfully" });


    } catch (error) {
        console.error("Delete Post Error:", error);
        res.status(500).json({ success: false, message: "Error deleting post", error: error.message });
    }
};

module.exports = {
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
};
