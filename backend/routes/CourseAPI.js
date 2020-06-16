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

// get a specific course - tested with postman
router.route("/:id").get((req, res) => {
  Course.find({ courseid: req.params.id })
    .then((course) => res.json(course))
    .catch((err) => res.status(400).json("Error: " + err));

  console.log("Testing a route");
  console.log(req.params.id);
});

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
//Update course average rating - tested with postman
router.route("/update/:id").post((req, res) => {
  const newRating=req.body.rating;
  Course.findOne({ courseid: req.params.id })
    .then(course => {
      let cumulative= course.averagerating * course.numberofreviews;
      cumulative=cumulative+newRating;
      let updatedrating = cumulative/(course.numberofreviews+1);
      
      course.averagerating=updatedrating;
      course.numberofreviews = course.numberofreviews+1;
      console.log(course);
      course
        .save()
        .then(() => res.json("Course rating updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

//insert a new course - tested with postman
router.route("/").post((req, res) => {
  const courseid = req.body.courseid;
  const instructor = req.body.instructor;
  const title = req.body.title;
  const description = req.body.description;

  const newCourse = new Course({
    courseid,
    title,
    description,
    instructor,
  });

  newCourse
    .save()
    .then(() => res.json("Course added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//http://localhost:4000/${params.questionId}
// insert a new answer to a course -to be tested with postman
//problem here

module.exports = router;