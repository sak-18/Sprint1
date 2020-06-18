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
router.route("/").get((req, res) => {
  Review.find()
    .then((reviews) => res.json(reviews))
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

router.post('/upvote/:id', (req,res) =>{
  Review.findById(req.params.id)
    .then((review) => {
      var isupvoted=false;
      var isdownvoted=false;
      var indexd,id;
      for (id = 0; id < review.downvotedby.length; id++) {
        if(review.downvotedby[id]=== req.body.email){
          isdownvoted=true; 
          indexd=id;
          break;    
        }
      }
      
      var index,i;
      for (i = 0; i < review.upvotedby.length; i++) {
        if(review.upvotedby[i]=== req.body.email){
          isupvoted=true; 
          index=i;
          break;    
        }
      }
      if(isdownvoted){
        review.downvotedby.splice(indexd,1);
        review.upvotedby.push(req.body.email);
      }
      if(isupvoted){
        review.upvotedby.splice(index,1);
      }
      if(!isupvoted && !isdownvoted ){
        review.upvotedby.push(req.body.email);
      }
      console.log(review);
      review
        .save()
        .then(() => res.json("Upvote updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//remove reported review
router.route("/remove/:id/").delete((req, res) => {
  Review.findByIdAndDelete(req.params.id)
    .then(() => res.json("deleted successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});


//downvote review
router.post('/downvote/:id', (req,res) =>{
  Review.findById(req.params.id)
    .then((review) => {
      var isupvoted=false;
      var isdownvoted=false;
      var indexd,id;
      for (id = 0; id < review.downvotedby.length; id++) {
        if(review.downvotedby[id]=== req.body.email){
          isdownvoted=true; 
          indexd=id;
          break;    
        }
      }
      var index,i;
      for (i = 0; i < review.upvotedby.length; i++) {
        if(review.upvotedby[i]=== req.body.email){
          isupvoted=true; 
          index=i;
          break;    
        }
      }
      if(isdownvoted){
        review.downvotedby.splice(index,1);
      }
      if(isupvoted){
        review.upvotedby.splice(index,1);
        review.downvotedby.push(req.body.email);
      }
      if(!isupvoted && !isdownvoted ){
        review.downvotedby.push(req.body.email);
      }
      console.log(review);
      review
        .save()
        .then(() => res.json("Downvote updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;



