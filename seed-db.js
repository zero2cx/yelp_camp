var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var campgroundData = [
  {
    name: "Woodsy Place",
    image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
    description: "In the woods, for sure."
  },
  {
    name: "Beach Camp",
    image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
    description: "On the beach, for sure."
  },
  {
    name: "Picnic Place",
    image: "https://farm9.staticflickr.com/8456/8006869967_de2ed3e564.jpg",
    description: "We have picnic tables."
  }
]

function seedDB(){
  // remove data from the db
  Campground.remove({}, function(err){
    if(err){
      console.log("** error: " + err);
    } else {
      console.log("++ info: removed db data");
    }
    // create new seed data in the db
    campgroundData.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log("** error: " + err);
        } else {
          console.log("++ info: campground created");
          Comment.create({
            text: "What's up, Doc?",
            author: "Bugs Bunny"
          }, function(err, comment){
            if(err){
              console.log("** error: " + err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log("++ info: comment created");
            }
          });
        }
      });
    });
  });
}

module.exports = seedDB;
