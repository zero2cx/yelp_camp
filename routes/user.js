var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/register", function(req, res) {
  res.render("user/register");
});


router.post("/register", function(req, res) {
  var newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log("** error: " + err);
      return res.render("user/register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds");
    });
  });
});


router.get("/login", function(req, res) {
  res.render("user/login");
});


router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/user/login"
}), function(req, res) {
  // empty block
});


router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/campgrounds");
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/user/login");
}

module.exports = router;
