//import dependencies
const router = require("express").Router();
var { ResolvedContent } = require("../models/ResolvedContent.js");

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
  ResolvedContent.find()
    .then((contents) => res.json(contents))
    .catch((err) => res.status(400).json("Error: " + err));
});

//insert a new content - tested with postman
router.route("/").post( (req, res) => {
  const contentType = req.body.contentType;
  const resolutionStatus = req.body.resolutionStatus;
  const reportedby = req.body.reportedby;
  const title = req.body.title;
  const description = req.body.description;
  const postedby = req.body.postedby;
  
  const newResolvedContent = new ResolvedContent({
    contentType,
    resolutionStatus,
    identifier,
    reportedby,
    postedby,
    title,
    description
  });
  newResolvedContent
    .save()
    .then(() => res.json("ResolvedStuff added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;