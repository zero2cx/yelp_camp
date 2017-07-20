/* file: routes/index.js                           */
/* project: YelpCamp                               */
/* developer: David Schenck                        */
/*     <zero2cx @ gmail com>                       */
/* original author & project design: Colt Steele   */
/*     <www facebook com colt.steele>              */
/* project refactor: Ian Schoonover                */
/*     <plus google com/u/0/117096754871952321821> */
/* license: ISC                                    */

var express = require("express");
var router = express.Router();
var bootstrap = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
var modernizr = 'https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js';

// route: SERVER_ROOT
router.get("/", function(req, res) {
  res.render("landing", {
    styles: [bootstrap, '/styles/landing.css'],
    scripts: [modernizr]
  });
});

module.exports = router;
