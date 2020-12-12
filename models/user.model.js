var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

let userSchema = new Schema(
  {
    local: {
      email: { type: String, unique: true, required: true, max: 100 },
      password: { type: String, max: 100 },
      username: { type: String, max: 100 },
      is_active: { type: Number, default: 1 }
    }
  },
  { timestamps: true }
);

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model("User", userSchema);
