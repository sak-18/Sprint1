//import dependencies
const router = require("express").Router();
var { Review } = require("../models/Review.js");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const auth = require('../middleware/auth');

// define the Express app
const app = express();

// retrieve all reviews - tested with postman
router.route("/").get(auth,(req, res) => {
  Review.find()
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json("Error: " + err));
});

// get a specific review - tested with postman
router.route("/:id/").get(auth,(req, res) => {
  
  Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(err => res.status(400).json("Error: " + err));
});

//insert a new review - tested with postman
router.route("/").post(auth,(req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const rating = req.body.rating;

  const newReview = new Review({
    title,
    description,
    rating
  });

  newReview
    .save()
    .then(() => res.json("Review added!"))
    .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;
