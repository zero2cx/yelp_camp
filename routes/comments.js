var express = require("express");
var router = express.Router({
  mergeParams: true
});
var Campground = require("../models/campground");
var Comment = require("../models/comment");


// ROUTE: NEW COMMENT
// display the new-comment form

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

// ROUTE: CREATE COMMENT
// add the new-comment to the database
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


// ROUTE: EDIT COMMENT
// display the edit-comment form
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if (err) {
      console.log("error: " + err)
      res.redirect("back");
    }
    else {
      res.render("comments/edit", {
        comment: comment,
        campgroundId: req.params.id
      });
    }
  });
});


// ROUTE: UPDATE COMMENT
// update the comment in the database
router.put("/:comment_id", checkCommentOwnership, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
    if (err) {
      console.log("error while updating comment");
      res.redirect("back");
    }
    else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  });
});


// ROUTE: DELETE COMMENT
// delets a comment from the database
router.delete("/:comment_id", checkCommentOwnership, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      console.log("error while deleting comment");
      res.redirect("back");
    }
    else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  });
});



// MIDDLEWARE
// ensure that the user is logged in, if yes then continue, +
// + if not then redirect to the login page
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/user/login");
}


// check if the logged-in user is the owner of the comment
function checkCommentOwnership(req, res, next) {
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


module.exports = router;
