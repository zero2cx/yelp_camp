var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


// ROUTE: INDEX CAMPGROUNDS
// display all-campgrounds list
router.get("/", function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log("** error: " + err);
    }
    else {
      res.render("campgrounds/index", {
        campgrounds: campgrounds
      });
    }
  });

});


// ROUTE: NEW CAMPGROUND
// display the new-campground form
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});


// ROUTE: CREATE CAMPGROUND
// add the new-campground to the database
router.post("/", isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  Campground.create({
    name: name,
    image: image,
    description: desc,
    author: author
  }, function(err, campground) {
    if (err) {
      console.log("** error: " + err);
    }
    else {
      console.log(campground);
      res.redirect("/campgrounds");
    }
  });
});


// ROUTE: SHOW CAMPGROUND
// display the details for one-campground
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
    if (err) {
      console.log("** error: " + err);
    }
    else {
      res.render("campgrounds/show", {
        campground: campground
      });
    }
  });
});


// ROUTE: EDIT CAMPGROUND
// display the edit-campground form
router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    res.render("campgrounds/edit", {
      campground: campground
    });
  });
});


// ROUTE: UPDATE CAMPGROUND
// update the campground in the database
router.put("/:id", checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground) {
    if (err) {
      console.log("** error while updating campground");
      console.log(err);
      res.redirect("/campgrounds");
    }
    else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});


// ROUTE: DESTROY CAMPGROUND
// delete the campground from the databse
router.delete("/:id", checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log("** error while deleting campgound");
      console.log(err);
      res.redirect("/campgrounds");
    }
    else {
      res.redirect("/campgrounds");
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

// check if the logged-in user is the owner of the campground
function checkCampgroundOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, campground) {
      if (err) {
        console.log("** error: " + err);
        res.redirect("back");
      }
      else {
        if (campground.author.id.equals(req.user._id)) {
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
    res.reirect("back");
  }
}

module.exports = router;
