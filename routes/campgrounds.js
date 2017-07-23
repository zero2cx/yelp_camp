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
var geocoder = require('geocoder');
var bootstrapCss = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
var fontawesomeCss = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';

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
        page: 'campgrounds',
        styles: [bootstrapCss, fontawesomeCss, '/styles/main.css'],
        headerScripts: []
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
    styles: [bootstrapCss, fontawesomeCss, '/styles/main.css', '/styles/campground_form.css'],
    headerScripts: []
  });
});

/*
//CREATE - add new campground to DB
router.post('/', middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var cost = req.body.cost;
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newCampground = {name: name, image: image, description: desc, cost: cost, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect('/campgrounds');
        }
    });
  });
});
*/

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
  geocoder.geocode(req.body.campground.location, function(err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    Campground.create({
      name: name,
      price: price,
      rent_cycle: rent_cycle,
      image: image,
      description: desc,
      author: author,
      lat: lat,
      lng: lng,
      location: location
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
        styles: [bootstrapCss, fontawesomeCss, '/styles/main.css'],
        headerScripts: []
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
        styles: [bootstrapCss, fontawesomeCss, '/styles/main.css', '/styles/campground_form.css'],
        headerScripts: []
      });
    }
  });
});

/*
router.put('/:id', function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash('error', err.message);
            res.redirect('back');
        } else {
            req.flash('success','Successfully Updated!');
            res.redirect('/campgrounds/' + campground._id);
        }
    });
  });
});
*/

// ROUTE: UPDATE CAMPGROUND
// update the campground in the database
router.put('/:id', Middleware.checkCampgroundOwnership, function(req, res) {
  geocoder.geocode(req.body.location, function(err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {
      name: req.body.campground.name,
      image: req.body.campground.image,
      description: req.body.campground.description,
      price: req.body.campground.price,
      rent_cycle: req.body.campground.rent_cycle,
      lat: lat,
      lng: lng,
      location: location
    };
    Campground.findByIdAndUpdate(req.params.id, {
      $set: newData
    }, function(err, campground) {
      if (err) {
        req.flash('error', err.message);
        console.log('** error: ' + err.message);
        res.redirect('back');
      } else {
        req.flash('success', 'Successfully Updated!');
        res.redirect('/campgrounds/' + req.params.id);
      }
    });
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
      req.flash('success', 'successfully deleted the campground');
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;
