/* file: models/comment.js                        */
/* project: YelpCamp                              */
/* developer: David Schenck <zero2cx @ gmail com> */
/* original author & project design:              */
/*     Colt Steele <www facebook com colt.steele> */
/* license: ISC                                   */

var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Comment", commentSchema);
