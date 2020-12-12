var jwt = require("jsonwebtoken");
var User = require("../models/user.model");
var config = require("../config");

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    // return res.status(401).end();
    return res.send("Unauthorized Error: authorization header is not set.");
  }

  // get the last part from a authorization header string like "bearer token-value"
  var token = req.headers.authorization.split(" ")[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      // return res.status(401).end();
      return res.send("Failed to authenticate token.");
    }

    var userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        // return res.status(401).end();
        return res.send("Un-authorized user.");
      }
      // pass user details onto next route
      req.user = user;
      return next();
    });
  });
};
