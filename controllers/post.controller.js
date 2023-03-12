const Post = require("../models/post.model");

// Create a new post
exports.createPost = async (req, res) => {
  const { author, content } = req.body;
  console.log(author)
  try {
    const post = await Post.create({
      author,
      content,
    });
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error occurred while creating post-its" });
  }
};

// Get all posts by ID
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({author: req.params.userId, deleted: false})
    .populate({ path: "author", select: "username" })
    .sort({createdAt : - 1})
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error occurred while fetching posts-its" });
  }
};

// get all posts from a handle
exports.getAllPostsFromAHandle = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.username, deleted: false })
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error occurred while fetching posts-its" });
  }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId, author: req.params.userId,
      deleted: false,
    })
    .populate({ path: "author", select: "username" });
    if (!post) {
      return res.status(404).json({ error: "Post-it not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while fetching post-it" });
  }
};

// Update a post by ID
exports.updatePostById = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.postId },
      req.body,
      {
        new: true,
      }
    ).populate("author", "content");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error occurred while updating post-it" });
  }
};

// Delete a post by ID
exports.deletePostById = async (req, res) => {
try {
  await Post.findOneAndUpdate(
    { _id: req.params.postId, author: req.params.userId },
    { deleted: true },
    { new: true }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Post deleted successfully",
      });
    });
} catch (error) {
  console.log(error);
  res.status(500).json({ error: "An error occurred while deleting post" });
}
};
