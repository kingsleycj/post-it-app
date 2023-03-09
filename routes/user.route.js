const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// fetch all users
router.get("/", userController.fetchAllUsers)

// fetch a single user
router.get("/:userId", userController.fetchSingleUserById )

// edit user
router.put("/:userId", userController.editUserById)

// delete a user
router.delete("/:userId", userController.deleteUser)

module.exports = router;