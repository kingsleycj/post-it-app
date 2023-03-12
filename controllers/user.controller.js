const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateRandomAvatar = require("../utils/avatar");

// create a new user controller
exports.createUser = (req, res) => {
  const avatarUrl = generateRandomAvatar(req.body.email);
  User.findOne({ email: req.body.email })
    .exec()
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409).json({
          message: "Email already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const imgTag = `<img src="${avatarUrl}" alt="${req.body.email}\'s avatar">`;
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              avatar: generateRandomAvatar(req.body.email),
              imgTag: imgTag,
              username: req.body.username,
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User Created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

// user login controller
exports.userLogin = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authentication Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              userId: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "10h",
            }
          );
          return res.status(200).json({
            message: "Authentication Successful",
            token: token,
            userDetails: user,
          });
        }
        return res.status(401).json({
          message: "Authentication Failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// fetch single user controller
exports.fetchSingleUserById = (req, res) => {
  User.findOne({ _id: req.params.userId, deleted: false })
    .exec()
    .then((doc) => {
      console.log("From database:", doc);
      if (doc) {
        const imgTag = `<img src="${doc.avatar}" alt="${doc.email}\'s avatar">`;
        res.status(200).json({
          message: "User fetched successfully",
          fetchedUser: {
            _id: req.params.userId,
            imgTag: imgTag,
            avatar: doc.avatar,
            username: doc.username,
            email: doc.email,
          },
        });
      } else {
        res
          .status(401)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Error occurred while fetching user", error: err });
    });
};

// fetch all users controller
exports.fetchAllUsers = async (req, res) => {
  try {
    const user = await User.find({ deleted: false }).select(
      "_id avatar imgTag username email"
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete user controller
exports.deleteUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { deleted: true },
    { new: true }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "User deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
    res.status(401).json({ message: "No valid entry found for provided ID" });
};

// edit User controller
exports.editUserById = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.userId;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({ message: "User updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// fetching User By Handle
exports.fetchUserUsingHandle = (req, res) => {
  User.findOne({ username: req.params.username, deleted: false })
    .exec()
    .then((doc) => {
      console.log("From database:", doc);
      if (doc) {
        const imgTag = `<img src="${doc.avatar}" alt="${doc.username}\'s avatar">`;
        res.status(200).json({
          message: "User fetched successfully",
          fetchedUser: {
            _id: req.params.userId,
            imgTag: imgTag,
            avatar: doc.avatar,
            username: doc.username,
            email: doc.email,
          },
        });
      } else {
        res
          .status(401)
          .json({ message: "No valid entry found for provided username" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error occurred while fetching user",
        error: err,
      });
    });
};