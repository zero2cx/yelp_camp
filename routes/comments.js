var express = require("express");
var router = express.Router({
  mergeParams: true
});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// COMMENTS
// route: NEW
router.get("/new", isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log("** error: " + err);
    }
    else {
      res.render("comments/new", {
        campground: campground
      });
    }
  });
});

// route: CREATE
router.post("/", isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log("** error: " + err);
      res.redirect("/campgrounds");
    }
    else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log("** error: " + err);
        }
        else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + req.params.id); // res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/user/login");
}


module.exports = router;
