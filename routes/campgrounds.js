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
router.get("/new", function(req, res) {
  res.render("campgrounds/new");
});


// CAMPGROUNDS
// route: CREATE
router.post("/", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  Campground.create({
    name: name,
    image: image,
    description: desc
  }, function(err, campground) {
    if (err) {
      console.log("** error: " + err);
    }
    else {
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

module.exports = router;
