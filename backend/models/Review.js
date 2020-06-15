/**
	Mongoose is a package used to create schemas for MongoDB.
	Schema: a description of how data is stored in the database
	Mongo: a database used to store data
**/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Creates schema for movie with required attributes and data types
var ReviewSchema = new Schema({
  title: { type: String, required: true, unique: true },
  courseid: { type:String, required:true},
  description: { type: String, required: true },
  postedby: { type: String, required: true },
  upvotes: [{type:String, required:false}],
  downvotes: [{type:String, required:false}],
  time: {
    type: Date,
    default:Date.now
  },
  rating: { type: Number, required: false, default: 3 }
});

const Review = mongoose.model("Review", ReviewSchema);
// Below code used for exporting the Schemas
// Used when we need to import the below Schemas in another file.
module.exports = { Review: Review };
