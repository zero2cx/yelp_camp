// file: app.js
// dev: david schenck

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDatabase = require("./seed-db");

var indexRoutes = require("./routes/index");
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var userRoutes = require("./routes/user");

mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// seedDatabase();

app.use(require("express-session")({
  secret: "Smell The Glove by Spinal Tap",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/user", userRoutes);

// listen for incoming requests
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("++ info: server is running");
});
