const Comment = require("../models/comment.model");

// create a new comment
exports.createComment = async (req, res) => {
  const { author, postId, content } = req.body;
  try {
    const comment = new Comment({ author, postId, content });
    await comment.save();
    res.status(201).json({
      message: "comment created successfully",
      comment: comment
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Comment could not be created" });
  }
};

// fetch all Comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ deleted: false });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Comments could not be fetched" });
  }
};

// fetch a comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.commentId,
      deleted: false,
    });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({
      message: "comment fetched successfully",
      comment: comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Comment could not be fetched" });
  }
};

// update a comment by ID
exports.updateCommentById = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId },
      { content },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({
      message: "comment updated successfully",
      comment: comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while updating comment" });
  }
};

// delete a comment by ID
exports.deleteCommentById = async (req, res) => {
  try {
    await Comment.findOneAndUpdate(
      { _id: req.params.commentId },
      { deleted: true },
      { new: true }
    )
      .exec()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "Comment deleted successfully",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while deleting comment" });
  }
};
