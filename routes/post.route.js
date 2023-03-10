const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const commentRoute = require("./comment.route");

router.use(commentRoute)

// Create a new post
router.post("/users/:userId/posts", postController.createPost);

// Get all posts
router.get("/users/:userId/posts", postController.getAllPosts);

// Get a post by ID
router.get("/users/:userId/posts/:postId", postController.getPostById);

// Update a post by ID
router.put("/users/:userId/posts/:postId", postController.updatePostById);

// Delete a post by ID
router.delete("/users/:userId/posts/:postId", postController.deletePostById);

module.exports = router;
