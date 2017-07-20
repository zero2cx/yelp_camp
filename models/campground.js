/* file: models/campground.js                     */
/* project: YelpCamp                              */
/* developer: David Schenck <zero2cx @ gmail com> */
/* original author & project design:              */
/*     Colt Steele <www facebook com colt.steele> */
/* license: ISC                                   */

var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
  name: String,
  price: String,
  rent_cycle: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

module.exports = mongoose.model("Campground", campgroundSchema);
