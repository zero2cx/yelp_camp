var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// CAMPGROUNDS
// route: INDEX
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

// CAMPGROUNDS
// route: NEW
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});


// CAMPGROUNDS
// route: CREATE
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


// CAMPGROUNDS
// route: SHOW
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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/user/login");
}

module.exports = router;
