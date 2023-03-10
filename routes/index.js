const express = require("express");
const route = express.Router();
const userRoute = require("./user.route");
const postRoute = require("./post.route");
const authRoute = require("./auth.route");

// Calling all routes
route.use("/", authRoute).use("/users", userRoute).use("/", postRoute);

module.exports = route;
