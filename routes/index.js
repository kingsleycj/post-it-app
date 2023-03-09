const express = require("express");
const route = express.Router();
const commentRoute = require("./comment.route");
const userRoute = require("./user.route");
const postRoute = require("./post.route");
const authRoute = require("./auth.route");

// Create a new post
route
  .use("/", authRoute)
  .use("/users", userRoute)
  .use("/posts", postRoute)
  .use("/comments", commentRoute);

module.exports = route;
