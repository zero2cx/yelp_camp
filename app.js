// file: app.js
// dev: david schenck

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seed-db");

mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

// route: SERVER_ROOT
app.get("/", function(req,res){
  res.render("landing");
});

// route: INDEX
app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, campgrounds){
    if(err){
      console.log("** error: " + err);
    } else {
      res.render("index", {campgrounds: campgrounds});
    }
  });

});

// route: NEW
app.get("/campgrounds/new", function(req, res){
  res.render("new");
});

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

// route: SHOW
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
    if(err){
      console.log("** error: " + err);
    } else {
      res.render("show", {campground: campground});
    }
  });
});

// listen for incoming requests
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("++ info: server is running");
});
