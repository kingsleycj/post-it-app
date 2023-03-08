const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
// const validatorSchema = require("../middlewares/validator")

// create a new user
router.post("/signup", userController.createUser);

// User login and jwt validation
router.post("/login", userController.userLogin);

// fetch all users
router.get("/", userController.fetchAllUsers)

// fetch a single user
router.get("/:userId", userController.fetchSingleUserById )

// delete a user
router.delete("/:userId", userController.deleteUser)

module.exports = router;