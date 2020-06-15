var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Create the Schema
var StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  photo: {
    type: String,
    // required: true,
  },
  registration_date: {
      type: Date,
      default:Date.now
  }
});

const Student = mongoose.model("Student", StudentSchema);
// Below code used for exporting the Schemas
// Used when we need to import the below Schemas in another file.
module.exports = { Student: Student };