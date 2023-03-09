const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const commentController = require("../controllers/comment.controller");

// Create a new comment on a post
router.post("/:postId/comments", commentController.createComment);

// // Get all comments on a post
// router.get("/:postId/comments", postController.getCommentsByPostId);

// Get a single comment by ID
router.get("/:postId/comments/:commentId", commentController.getCommentById);

// Update a single comment by ID
router.patch("/:postId/comments/:commentId", commentController.updateCommentById);

// Delete a single comment by ID
router.delete("/comments/:id", commentController.deleteCommentById);

module.exports = router;
