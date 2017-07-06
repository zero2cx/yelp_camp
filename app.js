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
var seedDB = require("./seed-db");

mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

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

// route: SERVER_ROOT
app.get("/", function(req, res) {
  res.render("landing");
});

// CAMPGROUNDS
// route: INDEX
app.get("/campgrounds", function(req, res) {
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
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});

// CAMPGROUNDS
// route: CREATE
app.post("/campgrounds", function(req, res) {
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
app.get("/campgrounds/:id", function(req, res) {
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

// COMMENTS
// route: NEW
app.get("/campgrounds/:id/comments/new", function(req, res) {
  Campground.findById(req.params.id, isLoggedIn, function(err, campground) {
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
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + req.params.id); // res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

/////////////////////////
// show register form
app.get("/register", function(req, res) {
  res.render("register");
});

//handle sign up logic
app.post("/register", function(req, res) {
  var newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log("** error: " + err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds");
    });
  });
});


app.get("/login", function(req, res) {
  res.render("login");
});


app.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res) {
  // empty block
});


app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/campgrounds");
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


// listen for incoming requests
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("++ info: server is running");
});
