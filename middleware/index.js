var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

// ensure that the user is logged in, if yes then continue, +
// + if not then redirect to the login page
middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please log in to YelpCamp")
  res.redirect("/user/login");
}


// check if the logged-in user is the owner of the campground
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, campground) {
      if (err) {
        req.flash("error", "Campground not found");
        console.log("** error: " + err);
        res.redirect("back");
      }
      else {
        if (campground.author.id.equals(req.user._id)) {
          next();
        }
        else {
          req.flash("error", "Insufficient Permissions: Not Authorized to Continue");
          console.log("** error: Insufficient Permissions: Not Authorized to Continue");
          res.redirect("back");
        }
      }
    });
  }
  else {
    req.flash("error", "Please log in to edit a campground");
    console.log("** error: please log in to edit a campground");
    res.redirect("back");
  }
}


// check if the logged-in user is the owner of the comment
middlewareObj.checkCommentOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, comment) {
      if (err) {
        console.log("** error: " + err);
        res.redirect("back");
      }
      else {
        if (comment.author.id.equals(req.user._id)) {
          next();
        }
        else {
          console.log("** error: permissions insufficient to edit or delete this campground");
          res.redirect("back");
        }
      }
    });
  }
  else {
    console.log("** error: please log in to edit a campground");
    res.redirect("back");
  }
}

module.exports = middlewareObj;
