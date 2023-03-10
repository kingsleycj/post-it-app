const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    password: { type: String, required: true, min: 5 },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);

userSchema.virtual("post", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});

module.exports = mongoose.model("User", userSchema);
