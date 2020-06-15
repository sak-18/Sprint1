var mongoose = require("mongoose");
var Schema = mongoose.Schema;

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
  },
  registration_date: {
      type: Date,
      default:Date.now
  }
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = { Student: Student };
