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

// define the Express app
const app = express();

// retrieve all questions - tested with postman
router.route("/").get((req, res) => {
  Question.find()
    .then(questions => res.json(questions))
    .catch(err => res.status(400).json("Error: " + err));
});

// get a specific question - tested with postman
router.route("/:id").get((req, res) => {
  /*  
  Question.find()
    .then(questions => res.json(questions))
    .catch(err => res.status(400).json("Error: " + err));

  const question = questions.filter(q => q._id === parseInt(req.params.id));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();
  res.send(question[0]);
*/
  Question.findById(req.params.id)
    .then(question => res.json(question))
    .catch(err => res.status(400).json("Error: " + err));
});

//insert a new question - tested with postman
router.route("/").post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const answers = [];

  const newQuestion = new Question({
    title,
    description,
    answers
  });

  newQuestion
    .save()
    .then(() => res.json("Question added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//http://localhost:4000/${params.questionId}
// insert a new answer to a question -to be tested with postman
//problem here
router.route("/answer/:id").post((req, res) => {
  /*
  Question.update(req.params.id)
    .then(question => {
      question.description = req.body.description;
      question.title = req.body.title;
      question.answers = question.answers.push(req.body.answer);
      console.log(question.answers[0]);
      question
        .save()
        .then(() => res.json(question.answers[0])) //answers addded
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
    */
  //console.log(req.body);
  //console.log(typeof req.body.answer);
  Question.findById(req.params.id)
    .then(question => {
      question.answers.push(req.body.answer);
      console.log(question);
      question
        .save()
        .then(() => res.json("Question updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
