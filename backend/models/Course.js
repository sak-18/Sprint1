/**
	Mongoose is a package used to create schemas for MongoDB.
	Schema: a description of how data is stored in the database
	Mongo: a database used to store data
**/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Creates schema for movie with required attributes and data types
var CourseSchema = new Schema({
  courseid: { type : String, required: true , unique: false},
  title: { type: String, required: true},
  description: { type: String, required: true },
  instructor: { type: String, required:false},
  numberofreviews: {type:Number,required: false, default: 0},
  averagerating: { type: Number, required: false, default: 0 }
});

const Course = mongoose.model("Course", CourseSchema);
// Below code used for exporting the Schemas
// Used when we need to import the below Schemas in another file.
module.exports = { Course: Course };
