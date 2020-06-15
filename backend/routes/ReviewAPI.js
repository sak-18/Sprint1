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

const auth = require("../middleware/auth");

// define the Express app
const app = express();

// retrieve all reviews - tested with postman
router.route("/:courseId").get((req, res) => {
  Review.find({ courseid: req.params.courseId })
    .then((reviews) => res.json(reviews))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get a specific review - tested with postman
router.route("/:courseId/:id/").get((req, res) => {
  Review.findById(req.params.id)
    .then((review) => res.json(review))
    .catch((err) => res.status(400).json("Error: " + err));
});

//insert a new review - tested with postman
router.route("/").post((req, res) => {
  const title = req.body.title;
  const courseid = req.body.courseid;
  const description = req.body.description;
  const rating = req.body.rating;
  const postedby = req.body.postedby;

  const newReview = new Review({
    title,
    courseid,
    description,
    postedby,
    rating,
  });

  newReview
    .save()
    .then(() => res.json("Review added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
