/* file: routes/comments.js                        */
/* project: YelpCamp                               */
/* developer: David Schenck                        */
/*     <zero2cx @ gmail com>                       */
/* original author & project design: Colt Steele   */
/*     <www facebook com colt.steele>              */
/* project refactor: Ian Schoonover                */
/*     <plus google com/u/0/117096754871952321821> */
/* license: ISC                                    */

var express = require("express");
var router = express.Router({
  mergeParams: true
});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var Middleware = require("../middleware");
var bootstrap = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';


// ROUTE: NEW COMMENT
// display the new-comment form
router.get("/new", Middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      req.flash("error", err.message);
      console.log("** error: " + err.message);
      res.redirect("/campgrounds");
    } else {
      res.render("comments/new", {
        campground: campground,
        styles: [bootstrap, '/styles/main.css'],
        scripts: []
      });
    }
  });
});

// ROUTE: CREATE COMMENT
// add the new-comment to the database
router.post("/", Middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      req.flash("error", err.message);
      console.log("** error: " + err.message);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          req.flash("error", err.message);
          console.log("** error: " + err.message);
          res.redirect("/campgrounds");
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + req.params.id);
        }
      });
    }
  });
});


// ROUTE: EDIT COMMENT
// display the edit-comment form
router.get("/:comment_id/edit", Middleware.checkCommentOwnership, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if (err) {
      req.flash("error", err.message);
      console.log("** error: " + err.message);
      res.redirect("/campgrounds");
    } else {
      res.render("comments/edit", {
        comment: comment,
        campgroundId: req.params.id,
        styles: [bootstrap, fontawesome, '/styles/main.css'],
        scripts: []
      });
    }
  });
});


// ROUTE: UPDATE COMMENT
// update the comment in the database
router.put("/:comment_id", Middleware.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
    if (err) {
      req.flash("error", err.message);
      console.log("** error: " + err.message);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  });
});


// ROUTE: DELETE COMMENT
// delets a comment from the database
router.delete("/:comment_id", Middleware.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      req.flash("error", err.message);
      console.log("** error: " + err.message);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  });
});


module.exports = router;
