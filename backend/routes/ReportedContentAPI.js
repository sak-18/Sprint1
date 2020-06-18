//import dependencies
const router = require("express").Router();
var { ReportedContent } = require("../models/ReportedContent.js");

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

// retrieve all content - tested with postman
router.route("/").get( (req, res) => {
  ReportedContent.find()
    .then((contents) => res.json(contents))
    .catch((err) => res.status(400).json("Error: " + err));
});

//insert a new content - tested with postman
router.route("/").post( (req, res) => {
  const contentType = req.body.contentType;
  const identifier = req.body.identifier;
  const reportedby = req.body.reportedby;
  const title = req.body.title;
  const description = req.body.description;
  const postedby = req.body.postedby;
  
  const newReportedContent = new ReportedContent({
    contentType,
    identifier,
    reportedby,
    postedby,
    title,
    description
  });
  newReportedContent
    .save()
    .then(() => res.json("ReportedStuff added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});


//Save resolution status
router.post('/resolve/:id', (req,res) =>{
  ReportedContent.findById(req.params.id)
    .then((content) => {
      content.resolutionStatus=req.body.resolutionStatus;
      console.log(content);
      content
        .save()
        .then(() => res.json("Resolved!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;