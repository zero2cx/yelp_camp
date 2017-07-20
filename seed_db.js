/* file: seed_db.js                                */
/* project: YelpCamp                               */
/* developer: David Schenck                        */
/*     <zero2cx @ gmail com>                       */
/* original author & project design: Colt Steele   */
/*     <www facebook com colt.steele>              */
/* project refactor: Ian Schoonover                */
/*     <plus google com/u/0/117096754871952321821> */
/* license: ISC                                    */

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var campgroundsData = [{
  name: "Woodsy Place",
  image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
  description: "Corporis eaque eaque voluptatem velit corporis nihil. Ut magnam nihil et porro. Amet nihil quis ipsa omnis recusandae aut est tempore. Sit unde exercitationem quod labore aperiam tenetur. Magnam magnam voluptatum modi voluptatibus laudantium. Nulla corrupti in aut libero animi sint accusamus ipsa. Enim saepe sequi omnis ea. Ea est quia a maxime fuga quia tempore id. Velit quod rerum magni. Occaecati distinctio nesciunt numquam. Autem et dicta."
}, {
  name: "Beach Camp",
  image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
  description: "Voluptates nesciunt dignissimos velit ratione quae. Sunt vel quasi nostrum sunt consequuntur illum adipisci est. Ratione sit ab ducimus repellendus nihil. Et sed provident molestiae. Minus dolore aliquid est voluptas sequi."
}, {
  name: "Picnic Place",
  image: "https://farm9.staticflickr.com/8456/8006869967_de2ed3e564.jpg",
  description: "Quis blanditiis maiores quis illum provident at. Rerum explicabo minus asperiores vel eum cupiditate. Maiores impedit tempore nobis aperiam nesciunt molestiae qui maiores. Ut officiis facere optio omnis. Omnis ut."
}]


function seedDatabase() {
  // remove campgrounds data from the db
  Campground.remove({}, function(err) {
    if (err) {
      console.log("** error: " + err);
      process.exit(1);
    }
    console.log("++ info: removed all campgrounds");

    // remove comments data from the db
    Comment.remove({}, function(err) {
      if (err) {
        console.log("** error: " + err);
        process.exit(1);
      }
      console.log("++ info: removed all comments");

      // create new seed data for campgrounds and comments in the db
      campgroundsData.forEach(function(seed) {
        // create one campground
        Campground.create(seed, function(err, campground) {
          if (err) {
            console.log("** error: " + err);
            process.exit(1);
          }
          console.log("++ info: campground created");

          // create one comment, attach it to a campground, and +
          // + save the campground into the db
          Comment.create({
            text: "What's up, Doc?",
            author: "Bugs Bunny"
          }, function(err, comment) {
            if (err) {
              console.log("** error: " + err);
              process.exit(1);
            }
            campground.comments.push(comment);
            campground.save();
            console.log("++ info: comment created");
          });
        });
      });
    });
  });
}

module.exports = seedDatabase;
