/* file: routes/user.js                            */
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
var passport = require('passport');
var User = require('../models/user');
var Middleware = require('../middleware');
var bootstrapCss = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';

//
router.get('/register', function(req, res) {
  res.render('user/register', {
    page: 'register',
    styles: [bootstrapCss, '/styles/main.css'],
    headerScripts: []
  });
});

//
router.post('/register', function(req, res) {
  var newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      // req.flash('error', 'could not register user');
      console.log('** error: ' + err.message);
      return res.render("register", {
        error: err.message
      });
    }
    passport.authenticate('local')(req, res, function() {
      req.flash('success', 'Logged in as ' + user.username);
      res.redirect('/campgrounds');
    });
  });
});

//
router.get('/login', function(req, res) {
  res.render('user/login', {
    page: 'login',
    styles: [bootstrapCss, '/styles/main.css'],
    headerScripts: []
  });
});

//
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/user/login',
  failureFlash: true
}), function(req, res) {
  // empty block
});

//
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'Logged out');
  res.redirect('/campgrounds');
});

module.exports = router;
