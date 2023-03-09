const mongoose = require("mongoose");
const Post = require("../models/post.model");

// Create a new post
exports.createPost = async (req, res) => {
  const { username, content, comment } = req.body;
  try {
    const post = await Post.create({
      username,
      content,
    });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error occurred while creating post-its" });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("username", "content");
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error occurred while fetching posts-its" });
  }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ id: req.params.postId }).populate(
      "username",
      "content"
    );
    if (!post) {
      return res.status(404).json({ error: "Post-it not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching post-it" });
  }
};

// Update a post by ID
exports.updatePostById = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { id: req.params.postId },
      req.body,
      {
        new: true,
      }
    ).populate("username", "content");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error occurred while updating post-it" });
  }
};

// Delete a post by ID
exports.deletePostById = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ id: req.params.postId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({
        message: "Post deleted successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred when deleting post-it" });
  }
};