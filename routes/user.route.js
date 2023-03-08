const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
// const validatorSchema = require("../middlewares/validator")

// create a new user
router.post("/signup", userController.createUser);

module.exports = router;
