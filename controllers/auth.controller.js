var passport = require("passport");
var apiResponse = require("../models/ApiResponse");
// local login
exports.login = function(req, res, next) {
  passport.authenticate("local-login", { session: false }, function(
    err,
    user,
    info
  ) {
    if (err) {
      return next(err);
    }
    if (!user) {
      var message = info.Message ? info.Message : info.message;
      var type = 0;
      var code = 200;
      return res.send(
        apiResponse.makeResponse((user = []), message, type, code, req)
      );
    }
    var data = {
      user: user,
      isLoggedIn: true
    }
    var message = "You have successfully logged in ! ";
    var type = 1;
    var code = 200;
    return res.send(apiResponse.makeResponse(data, message, type, code, req));
  })(req, res, next);
};
