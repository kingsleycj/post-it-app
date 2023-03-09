const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

// Create a new post
router.post("/", postController.createPost);

// Get all posts
router.get("/", postController.getAllPosts);

// Get a post by ID
router.get("/:postId", postController.getPostById);

// Update a post by ID
router.put("/:postId", postController.updatePostById);

// Delete a post by ID
router.delete("/:postId", postController.deletePostById);

module.exports = router;
