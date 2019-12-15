var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  website: String,
  firstName: String,
  lastName: String,
  description: String
});

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);