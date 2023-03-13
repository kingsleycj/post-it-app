const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validateSignUp = require("../middlewares/validator")

// create a new user
router.post("/signup", validateSignUp, userController.createUser);

// User login and jwt validation
router.post("/login", userController.userLogin);

// fetch all users
router.get("/", userController.fetchAllUsers)

// fetch a user by handle
router.get("/@:username", userController.fetchUserUsingHandle);

// fetch a single user by Id
router.get("/:userId", userController.fetchSingleUserById )

// edit user 
router.put("/:userId", userController.editUserById)

// delete a user
router.delete("/:userId", userController.deleteUser)

module.exports = router;
