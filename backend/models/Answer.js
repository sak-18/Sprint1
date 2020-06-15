/**
	Mongoose is a package used to create schemas for MongoDB.
	Schema: a description of how data is stored in the database
	Mongo: a database used to store data
**/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Creates schema for Answer with required attributes and data types
var AnswerSchema = new Schema({
  questionid: { type : String, required:true},
  answer: { type: String, required: true },
  postedby: { type: String, required: false },
  upvotes: [{type:String, required:false}],
  downvotes: [{type:String, required:false}],
  time: {
    type: Date,
    default:Date.now
  },
});

const Answer = mongoose.model("Answer", AnswerSchema);
// Below code used for exporting the Schemas
// Used when we need to import the below Schemas in another file.
module.exports = { Answer: Answer };
