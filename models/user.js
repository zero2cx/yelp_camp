/* file: models/user.js                           */
/* project: YelpCamp                              */
/* developer: David Schenck <zero2cx @ gmail com> */
/* original author & project design:              */
/*     Colt Steele <www facebook com colt.steele> */
/* license: ISC                                   */

var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema);
