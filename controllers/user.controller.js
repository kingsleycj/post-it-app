const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
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
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
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


exports.userLogin = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user < 1) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authentication Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Authentication Successful",
            token: token,
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

exports.fetchSingleUserById = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .exec()
    .then((doc) => {
      console.log("From database:", doc);
      if (doc) {
        res.status(200).json({
          message: "User fetched successfully",
          fetchedUser: {
            _id: req.params.userId,
            username: doc.username,
            email: doc.email,
            password: doc.password
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
      res.status(500).json({ error: err });
    });
};

exports.fetchAllUsers = (req, res) => {
  User.find()
    .select("_id username email")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        "List of registered users": docs.map((doc) => {
            return {
            _id: doc._id,
            username: req.body.username,
            email: req.body.email
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.deleteUser = (req, res) => {
  User.findOneAndDelete({
    _id: req.params.userId,
  })
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
};