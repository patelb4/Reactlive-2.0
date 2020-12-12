var LocalStrategy = require("passport-local").Strategy;

// load jsonwebtoken
var User = require("../models/user.model");
var jwt = require("jsonwebtoken");
var config = require("../config");
var objectsFormat = require("../models/Formats");
var apiResponse = require("../models/ApiResponse");
var bcrypt = require('bcryptjs');
// expose this function to our app using module.exports
module.exports = function(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.populate("local.role").findById(id, function(err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, username, password, done) {
        console.log("HEYYY");
        // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        console.log("req body", username, password);  

        User.findOne({ "local.username": username }).exec(async function(err, user) {
          var type = 0;
          var code = 200;
          // if there are any errors, return the error before anything else
          if (err) return done(err);

          // if no user is found, return the message

          if (!user) {
            var message = "No user found.";
            return done(
              null,
              false,
              apiResponse.makeResponse((user = []), message, type, code, req)
            );
          }
  
          // if the user is found but the password is wrong
          if (user.local.is_active == "1") {
            let result = await bcrypt.compare(password, user.local.password);
            if (result == false) {
              var message = "Oops! Wrong password.";
              return done(
                null,
                false,
                apiResponse.makeResponse((user = []), message, type, code, req)
              );
            }

            // all is well, return successful user
            var payload = {
              sub: user._id
            };

            var token = jwt.sign(payload, config.jwtSecret);
            var data = objectsFormat.formatLoginUserObjetc(user, token);

            return done(null, data);
          } else {
            var message = "No active user found. ";
            var type = 1;
            var code = 200;
            return done(
              null,
              false,
              apiResponse.makeResponse((user = []), message, type, code, req)
            );
          }
        });
      }
    )
  );

};
