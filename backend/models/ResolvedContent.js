/**
	Mongoose is a package used to create schemas for MongoDB.
	Schema: a description of how data is stored in the database
	Mongo: a database used to store data
**/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Creates schema for ResolvedContent with required attributes and data types
var ResolvedContentSchema = new Schema({
    contentType:{ type:String , required:true},
    title: { type: String, required: true},
    resolutionStatus: { type:String, required:true},
    identifier: { type:String , required:true},
    description: { type: String, required: true },
    reportedby: { type:String , required:true},
    postedby: { type:String , required:true},
    time: {
        type: Date,
        default:Date.now
      }
});

const ResolvedContent = mongoose.model("ResolvedContent", ResolvedContentSchema);
// Below code used for exporting the Schemas
// Used when we need to import the below Schemas in another file.
module.exports = { ResolvedContent: ResolvedContent };
