const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validateSignUp = require("../middlewares/validator");
// const checkAuth = require("../middlewares/checkAuth");

// create a new user
router.post("/signup", validateSignUp, userController.createUser);

// User login and jwt validation
router.post("/login", userController.userLogin);

module.exports = router;
