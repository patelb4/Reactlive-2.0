var compression = require("compression");
const express = require("express");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var passport = require("passport");
var session = require("express-session");
var path = require("path");

var cookieParser = require("cookie-parser");
const app = express();
// compress
app.use(compression());
// setup express routes
require("dotenv").load();

// Set up mongoose connection
var port = process.env.PORT || 5000;

var mongoose = require("mongoose");
let dev_db_url = "mongodb+srv://admin:admin123@reactcalculator.ljixl.mongodb.net/calculator?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(
  session({
    secret: "mernAuthentication",
    saveUninitialized: true,
    resave: true
  })
);
// session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require("./config/passport.config")(passport); // pass passport for configuration

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static(path.join(__dirname, "client", "build")));
// Imports routes
var auth_routes = require("./routes/auth.route");

//Register Routes
app.use("/api/auth", auth_routes);

app.listen(port, () => `Server running on port ${port}`);
