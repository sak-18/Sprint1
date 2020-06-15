//import dependencies
const router = require("express").Router();
var { Course } = require("../models/Course.js");

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
  Course.find()
    .then((courses) => res.json(courses))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/count").get((req, res) => {
  Course.countDocuments({}, (err, count) => {
    if (err) {
      res.status(500).send({ status: false, error: err });
    } else {
      res.status(200).send({ courses: count });
    }
  });
});

<<<<<<< HEAD
// get a specific course - tested with postman
router.route("/:id").get((req, res) => {
=======
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
>>>>>>> 71fba5b83503d214699380a83ba814c4632108f8
  Course.findById(req.params.id)
    .then((course) => res.json(course))
    .catch((err) => res.status(400).json("Error: " + err));
});

<<<<<<< HEAD

//insert a new question - tested with postman
router.route("/").post((req, res) => {
  const courseid = req.body.courseid;
  const instructor = req.body.instructor;
  const title = req.body.title;
  const description = req.body.description;

  const newCourse = new Course({
    courseid,
    title,
    description,
    instructor
=======
//insert a new question - tested with postman
router.route("/").post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const ratings = 5;

  const newCourse = new Course({
    title,
    description,
    ratings,
>>>>>>> 71fba5b83503d214699380a83ba814c4632108f8
  });

  newCourse
    .save()
    .then(() => res.json("Course added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//http://localhost:4000/${params.questionId}
// insert a new answer to a question -to be tested with postman
//problem here

module.exports = router;
