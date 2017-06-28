// file: app.js
// dev: david schenck

var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/campgrounds", function(req, res){
  var campgrounds = [
    {name: "Salmon Creek", image: "http://www.photosforclass.com/download/4835814837"},
    {name: "Granite Hill", image: "http://www.photosforclass.com/download/7121863467"},
    {name: "Mountain Goat's Rest", image: "http://www.photosforclass.com/download/9627572189"}
  ];

  res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/", function(req,res){
  res.render("landing");
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("info: server is running");
});
