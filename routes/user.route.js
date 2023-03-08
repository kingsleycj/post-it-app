const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
// const validatorSchema = require("../middlewares/validator")

// create a new user
router.post("/signup", userController.createUser);

// User login and jwt validation
router.post("/login", userController.userLogin);

// delete a user
router.delete("/:userId", checkAuth, userController.deleteUser)

module.exports = router;
