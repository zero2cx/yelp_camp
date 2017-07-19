var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Middleware = require("../middleware");


// ROUTE: INDEX CAMPGROUNDS
// display all-campgrounds list
router.get("/", function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      req.flash("error", err.message);
      console.log("** error: " + err.message);
      res.redirect("back");
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
router.get("/new", Middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});


// ROUTE: CREATE CAMPGROUND
// add the new-campground to the database
router.post("/", Middleware.isLoggedIn, function(req, res) {
  var name = req.body.campground.name;
  var price = req.body.campground.price;
  var rental_period = req.body.campground.rental_period;
  var image = req.body.campground.image;
  var desc = req.body.campground.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  Campground.create({
    name: name,
    price: price,
    rent_cycle: rent_cycle,
    image: image,
    description: desc,
    author: author
  }, function(err, campground) {
    if (err) {
      req.flash("error", err.message);
      console.log("** error: " + err.message);
      res.redirect("/campgrounds");
    }
    else {
      res.redirect("/campgrounds");
    }
  });
});


// ROUTE: SHOW CAMPGROUND
// display the details for one-campground
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
    if (err) {
      req.flash("error", err.message);
      console.log("** error: " + err.message);
      res.redirect("/campgrounds");
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
router.get("/:id/edit", Middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      req.flash("error", err.message);
      console.log("** error: " + err.message);
      res.redirect("/campgrounds");
    }
    else {
      res.render("campgrounds/edit", {
        campground: campground
      });
    }
  });
});


// ROUTE: UPDATE CAMPGROUND
// update the campground in the database
router.put("/:id", Middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground) {
    if (err) {
      req.flash("error", err.message);
      console.log("** error: " + err.message);
      res.redirect("/campgrounds");
    }
    else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});


// ROUTE: DESTROY CAMPGROUND
// delete the campground from the databse
router.delete("/:id", Middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      req.flash("error", err.message);
      console.log("** error: " + err.message);
      res.redirect("/campgrounds");
    }
    else {
      res.redirect("/campgrounds");
    }
  });
});


module.exports = router;
