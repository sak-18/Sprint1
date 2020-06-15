//import dependencies
const router = require("express").Router();
var { Question } = require("../models/Question.js");

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

// retrieve all questions - tested with postman
router.route("/").get((req, res) => {
  Question.find()
    .then((questions) => res.json(questions))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get a specific question - tested with postman
router.route("/:id").get((req, res) => {
  Question.findById(req.params.id)
    .then((question) => res.json(question))
    .catch((err) => res.status(400).json("Error: " + err));
});

//insert a new question - tested with postman
router.route("/").post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const postedby = req.body.postedby;
  const answers = [];

  const newQuestion = new Question({
    title,
    description,
    postedby,
    answers
  });
  newQuestion
    .save()
    .then(() => res.json("Question added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/answer/:id").post((req, res) => {
  Question.findById(req.params.id)
    .then((question) => {
      question.answers.push(req.body.answer);
      console.log(question);
      question
        .save()
        .then(() => res.json("Question updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
