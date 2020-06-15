//import dependencies
const router = require("express").Router();
var { User } = require("../models/User.js");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// define the Express app
const app = express();

// retrieve all users - tested with postman
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get a specific user(with email) - tested with postman
router.route("/:id").get((req, res) => {
  User.find({ email: req.params.id })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

//insert a new user - tested with postman
router.route("/").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const photo = req.body.imageUrl;

  const newUser = new User({
    name,
    email,
    photo,
  });

  User.findOne({ email: req.body.email }, function (err, result) {
    if (result) {
      res.send(err);
    } else {
      newUser
        .save()
        .then(() => res.json("User added!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

module.exports = router;
