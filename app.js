/* file: app.js                                   */
/* project: YelpCamp                              */
/* developer: David Schenck <zero2cx @ gmail com> */
/* original author & project design:              */
/*     Colt Steele <www facebook com colt.steele> */
/* license: ISC                                   */

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
// var seedDatabase = require("./seed-db");
var indexRoutes = require("./routes/index");
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var userRoutes = require("./routes/user");
var databaseUrl = process.env.DATABASE_URL || "mongodb://localhost/yelp_camp";

mongoose.Promise = global.Promise;
mongoose.connect(databaseUrl);
// seedDatabase();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
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
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
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
