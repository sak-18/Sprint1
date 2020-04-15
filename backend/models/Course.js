/**
	Mongoose is a package used to create schemas for MongoDB.
	Schema: a description of how data is stored in the database
	Mongo: a database used to store data
**/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Creates schema for movie with required attributes and data types
var CourseSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  rating: { type: Number, required: false, default: 0 }
});

const Course = mongoose.model("Course", CourseSchema);
// Below code used for exporting the Schemas
// Used when we need to import the below Schemas in another file.
module.exports = { Course: Course };
