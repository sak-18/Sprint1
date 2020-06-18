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
router.route("/").get( (req, res) => {
  Question.find()
    .then((questions) => res.json(questions))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get a specific question - tested with postman
router.route("/:id").get( (req, res) => {
  Question.findById(req.params.id)
    .then((question) => res.json(question))
    .catch((err) => res.status(400).json("Error: " + err));
});

//insert a new question - tested with postman
router.route("/").post( (req, res) => {
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

//remove reported question
//remove reported review
router.route("/remove/:id/").delete((req, res) => {
  Question.findByIdAndDelete(req.params.id)
    .then(() => res.json("deleted successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});


//upvote question
router.post('/upvote/:id', (req,res) =>{
  Question.findById(req.params.id)
    .then((question) => {
      var isupvoted=false;
      var isdownvoted=false;
      var indexd,id;
      for (id = 0; id < question.downvotedby.length; id++) {
        if(question.downvotedby[id]=== req.body.email){
          isdownvoted=true; 
          indexd=id;
          break;    
        }
      }
      
      var index,i;
      for (i = 0; i < question.upvotedby.length; i++) {
        if(question.upvotedby[i]=== req.body.email){
          isupvoted=true; 
          index=i;
          break;    
        }
      }
      if(isdownvoted){
        question.downvotedby.splice(indexd,1);
        question.upvotedby.push(req.body.email);
      }
      if(isupvoted){
        question.upvotedby.splice(index,1);
      }
      if(!isupvoted && !isdownvoted ){
        question.upvotedby.push(req.body.email);
      }
      console.log(question);
      question
        .save()
        .then(() => res.json("Upvote updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
//downvote question
router.post('/downvote/:id', (req,res) =>{
  Question.findById(req.params.id)
    .then((question) => {
      var isupvoted=false;
      var isdownvoted=false;
      var indexd,id;
      for (id = 0; id < question.downvotedby.length; id++) {
        if(question.downvotedby[id]=== req.body.email){
          isdownvoted=true; 
          indexd=id;
          break;    
        }
      }
      var index,i;
      for (i = 0; i < question.upvotedby.length; i++) {
        if(question.upvotedby[i]=== req.body.email){
          isupvoted=true; 
          index=i;
          break;    
        }
      }
      if(isdownvoted){
        question.downvotedby.splice(index,1);
      }
      if(isupvoted){
        question.upvotedby.splice(index,1);
        question.downvotedby.push(req.body.email);
      }
      if(!isupvoted && !isdownvoted ){
        question.downvotedby.push(req.body.email);
      }
      console.log(question);
      question
        .save()
        .then(() => res.json("Downvote updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;