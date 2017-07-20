/* file: routes/campgrounds.js                     */
/* project: YelpCamp                               */
/* developer: David Schenck                        */
/*     <zero2cx @ gmail com>                       */
/* original author & project design: Colt Steele   */
/*     <www facebook com colt.steele>              */
/* project refactor: Ian Schoonover                */
/*     <plus google com/u/0/117096754871952321821> */
/* license: ISC                                    */

var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Middleware = require('../middleware');
var bootstrap = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
var fontawesome = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';

// ROUTE: INDEX CAMPGROUNDS
// display all-campgrounds list
router.get('/', function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      req.flash('error', err.message);
      console.log('** error: ' + err.message);
      res.redirect('back');
    } else {
      res.render('campgrounds/index', {
        campgrounds: campgrounds,
        styles: [bootstrap, fontawesome, '/styles/main.css'],
        scripts: []
      });
    }
  });
});


// ROUTE: NEW CAMPGROUND
// display the new-campground form
router.get('/new', Middleware.isLoggedIn, function(req, res) {
  res.render('campgrounds/new', {
    form_name: 'new_campground',
    form_title: 'new campground',
    styles: [bootstrap, fontawesome, '/styles/main.css', '/styles/campground_form.css'],
    scripts: ['/scripts/campground_form.js']
  });
});


// ROUTE: CREATE CAMPGROUND
// add the new-campground to the database
router.post('/', Middleware.isLoggedIn, function(req, res) {
  var name = req.body.campground.name;
  var price = req.body.campground.price;
  var rent_cycle = req.body.campground.rent_cycle;
  var image = req.body.campground.image;
  var desc = req.body.campground.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  Campground.create({
    name: name,
    price: price,
    rent_cycle: rent_cycle,
    image: image,
    description: desc,
    author: author
  }, function(err, campground) {
    if (err) {
      req.flash('error', err.message);
      console.log('** error: ' + err.message);
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});


// ROUTE: SHOW CAMPGROUND
// display the details for one-campground
router.get('/:id', function(req, res) {
  Campground.findById(req.params.id).populate('comments').exec(function(err, campground) {
    if (err) {
      req.flash('error', err.message);
      console.log('** error: ' + err.message);
      res.redirect('/campgrounds');
    } else {
      res.render('campgrounds/show', {
        campground: campground,
        styles: [bootstrap, fontawesome, '/styles/main.css'],
        scripts: []
      });
    }
  });
});


// ROUTE: EDIT CAMPGROUND
// display the edit-campground form
router.get('/:id/edit', Middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      req.flash('error', err.message);
      console.log('** error: ' + err.message);
      res.redirect('/campgrounds');
    } else {
      res.render('campgrounds/edit', {
        campground: campground,
        form_name: 'edit_campground',
        form_title: 'edit campground',
        styles: [bootstrap, fontawesome, '/styles/main.css', 'campground_form.css'],
        scripts: ['/scripts/campground_form.js']
      });
    }
  });
});


// ROUTE: UPDATE CAMPGROUND
// update the campground in the database
router.put('/:id', Middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground) {
    if (err) {
      req.flash('error', err.message);
      console.log('** error: ' + err.message);
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});


// ROUTE: DESTROY CAMPGROUND
// delete the campground from the databse
router.delete('/:id', Middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      req.flash('error', err.message);
      console.log('** error: ' + err.message);
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});


module.exports = router;
