// file: app.js
// dev: david schenck

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// var campgrounds = [
//   {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
//   {name: "Granite Hill", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"},
//   {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg"},
// ];
// Campground.create({
//   name: "Granite Hill",
//   image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"
//   }, function(err, campground){
//     if(err){
//       console.log("error: " + err);
//     } else {
//       console.log("created: " + campground);
//     }
// });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, campgrounds){
    if(err){
      console.log("error: " + err);
    } else {
      res.render("campgrounds", {campgrounds: campgrounds});
    }
  });

});

app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  Campground.create({name: name, image: image}, function(err, campground){
    if(err){
      console.log("error: " + err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res){
  res.render("new");
});
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("info: server is running");
});
