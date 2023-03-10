const express = require("express");
const route = express.Router();
const userRoute = require("./user.route");
const postRoute = require("./post.route");
const authRoute = require("./auth.route");

// Create a new post
route.use("/", authRoute).use("/users", userRoute).use("/", postRoute);
module.exports = route;
