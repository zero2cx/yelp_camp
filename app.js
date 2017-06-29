// file: app.js
// dev: david schenck

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [
  {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
  {name: "Granite Hill", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg"},
  {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
  {name: "Granite Hill", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg"},
  {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
  {name: "Granite Hill", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg"}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  campgrounds.push({name: name, image: image})
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
  res.render("new");
});
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("info: server is running");
});
