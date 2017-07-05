// file: app.js
// dev: david schenck

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seed-db");

mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// route: SERVER_ROOT
app.get("/", function(req,res){
  res.render("landing");
});

// CAMPGROUNDS
// route: INDEX
app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, campgrounds){
    if(err){
      console.log("** error: " + err);
    } else {
      res.render("campgrounds/index", {campgrounds: campgrounds});
    }
  });

});

// CAMPGROUNDS
// route: NEW
app.get("/campgrounds/new", function(req, res){
  res.render("campgrounds/new");
});

// CAMPGROUNDS
// route: CREATE
app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  Campground.create({name: name, image: image, description: desc}, function(err, campground){
    if(err){
      console.log("** error: " + err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// CAMPGROUNDS
// route: SHOW
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
    if(err){
      console.log("** error: " + err);
    } else {
      res.render("campgrounds/show", {campground: campground});
    }
  });
});

// COMMENTS
// route: NEW
app.get("/campgrounds/:id/comments/new", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log("** error: " + err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

// route: CREATE
app.post("/campgrounds/:id/comments", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log("** error: " + err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log("** error: " + err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + req.params.id);
          // res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// listen for incoming requests
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("++ info: server is running");
});
