/*
	Staring up our server/microservice: The following peice of code starts up our server, tells which 
	port to listen to and a callback on successful deployment
*/

//import dependencies
require("dotenv").config();
require("../backend/passport");
require("../backend/models/User");
require("../backend/models/Student");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const passport = require("passport");
const cookieSession = require("cookie-session");
// define the Express app
const app = express();

const port = process.env.PORT || 4000;

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan("combined"));

/**
	PassportJS - JWT Authentication With Google
**/
app.use(passport.initialize());
app.use(passport.session());

const questionsRouter = require("./routes/QuestionAPI");

app.use("/routes/questions", questionsRouter); // ********************CHANGED

const coursesRouter = require("./routes/CourseAPI");

app.use("/routes/courses", coursesRouter); // ********************CHANGED

const reviewRouter = require("./routes/ReviewAPI");
app.use("/routes/reviews", reviewRouter);

const userRouter = require("./routes/UserAPI");
app.use("/routes/users", userRouter);

const StudentRouter = require("./routes/StudentAPI");
app.use("/api/students", StudentRouter);


const AuthorisationRouter = require("./routes/auth");
app.use("/api/auth", AuthorisationRouter);

const signInRouter = require("./routes/Signin");
app.use("/", signInRouter);

/*
const authRouter = require("./routes/Auth");
app.use("/routes/auth", authRouter);
*/

//Server static assets if in production

if (process.env.NODE_ENV === "production") {
  //Set static folder
  console.log({ "IN node_env": process.env.NODE_ENV });
  app.use(express.static("../frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}
// start the server
var host = process.env.HOST || "0.0.0.0";
app.listen(port, host, function () {
  console.log("Listening on host:", host);
  console.log("Listening on port ", port);
  console.log("Actual process host:" + process.env.HOST);
  console.log("Actual process port:" + process.env.PORT);
});
