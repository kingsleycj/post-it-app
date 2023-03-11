const mongoose = require("mongoose");
const {Schema} = mongoose;

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId ,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },
    deleted: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});

module.exports = mongoose.model("Post", postSchema);
