var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Create the Schema
var UserSchema = new Schema({
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
    default:
      "https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png",
    // required: true,
>>>>>>> 71fba5b83503d214699380a83ba814c4632108f8
  },
  registration_date: {
      type: Date,
      default:Date.now
  }
});

const User = mongoose.model("User", UserSchema);
// Below code used for exporting the Schemas
// Used when we need to import the below Schemas in another file.
module.exports = { User: User };
