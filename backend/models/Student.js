var mongoose = require("mongoose");
var Schema = mongoose.Schema;

<<<<<<< HEAD
=======
// Create the Schema
>>>>>>> 71fba5b83503d214699380a83ba814c4632108f8
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
<<<<<<< HEAD
=======
    // required: true,
>>>>>>> 71fba5b83503d214699380a83ba814c4632108f8
  },
  registration_date: {
      type: Date,
      default:Date.now
  }
});

const Student = mongoose.model("Student", StudentSchema);
<<<<<<< HEAD
=======
// Below code used for exporting the Schemas
// Used when we need to import the below Schemas in another file.
>>>>>>> 71fba5b83503d214699380a83ba814c4632108f8
module.exports = { Student: Student };
