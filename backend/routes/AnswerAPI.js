//import dependencies
const router = require("express").Router();
var { Answer } = require("../models/Answer.js");

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


// get answers for a specific question - tested with postman
router.route("/:id").get( (req, res) => {
    Answer.find({ questionid: req.params.id })
    .then((answer) => res.json(answer))
    .catch((err) => res.status(400).json("Error: " + err));
});

//insert a new answer - tested with postman
router.route("/:id").post( (req, res) => {
  const questionid = req.params.id;
  const answer = req.body.answer;
  const postedby = req.body.postedby;

  const newAnswer = new Answer({
    questionid,
    answer,
    postedby,
  });
  newAnswer
    .save()
    .then(() => res.json("Answer added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;
