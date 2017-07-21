/* file: public/script/edit_form.js                */
/* project: YelpCamp                               */
/* developer: David Schenck                        */
/*     <zero2cx @ gmail com>                       */
/* original author & project design: Colt Steele   */
/*     <www facebook com colt.steele>              */
/* project refactor: Ian Schoonover                */
/*     <plus google com/u/0/117096754871952321821> */
/* license: ISC                                    */

"use strict";

var popupDialog = $('#popup-dialog');
var popupPic = $('#popup-pic');
var popupNoPic = $('#popup-no-pic');
var popupUrl = $('#popup-url');
var popupDone = $('#popup-done');
var popupCancel = $('#popup-cancel');
var thumbPic = $('#thumb-pic');
var thumbNoPic = $('#thumb-no-pic');
var rentCycle = $('#rent-cycle');
var rentCycleMenu = $('#rent-cycle-menu');
var submitRentCycle = $('#submit-rent-cycle');
var submitPic = $('#submit-pic');
var currentThumb;

// enable 'display: block;' property toggle-on for each thumb element
thumbPic.show = function() {
  $(this).css('display', 'block');
}
thumbNoPic.show = function() {
  $(this).css('display', 'block');
}

// display one of the two thumbnail elements
if (thumbPic.attr('src') == '') {
  thumbNoPic.show();
} else {
  thumbPic.show();
}

//////////////////////////////////////////////////////
// ON CLICK: handle a click on the THUMBNAIL PIC
thumbPic.on('click', function() { //console.log('++ IMAGE THUMBNAIL CLICKED');
  currentThumb = thumbPic.attr('src');
  popupUrl.val(currentThumb);
  popupPic.attr('src', currentThumb).show();
  popupNoPic.hide();
  popupDialog.show();

});

//////////////////////////////////////////////////////
// ON CLICK: handle a click on the NO_PIC THUMBNAIL
thumbNoPic.on('click', function() { //console.log('++ NO-PIC THUMBNAIL CLICKED');
  currentThumb = '';
  popupUrl.val('');
  popupPic.attr('src', '').hide();
  popupNoPic.show();
  popupDialog.show();
});

//////////////////////////////////////////////////////***************
// ON INPUT: attempt to display the IMAGE URL in the POPUP PIC
popupUrl.on('input', function() { //console.log('++ POPUP URL HAS CHANGED');
  popupPic.on('error', function() {
    popupPic.unbind('error').attr('src', '').hide();
    popupNoPic.show();
  }).attr('src', $(this).val()).show();
  popupNoPic.hide();
});

//////////////////////////////////////////////////////***************
// ON CLICK: handle a click on DONE BUTTON
popupDone.on('click', function() { //console.log('++ POPUP DONE CLICKED');
  var pic = popupPic.attr('src');
  if (pic) {
    thumbPic.attr('src', pic).show();
    thumbNoPic.hide();
    submitPic.val(pic);
  } else {
    thumbPic.attr('src', '').hide();
    thumbNoPic.show();
  }
  popupDialog.hide();
});

//////////////////////////////////////////////////////***************
// ON CLICK: handle a click on CANCEL BUTTON
popupCancel.on('click', function() { //console.log('++ POPUP CANCEL CLICKED');
  thumbPic.attr('src', currentThumb);
  popupDialog.hide();
});

//////////////////////////////////////////////////////
function toggleMenu() {
  rentCycleMenu.toggle();
}

//////////////////////////////////////////////////////
function perNight() {
  rentCycle.html('nightly&nbsp;<span class="caret"></span>');
  submitRentCycle.val('night');
  toggleMenu();
}

//////////////////////////////////////////////////////
function perWeek() {
  rentCycle.html('weekly&nbsp;<span class="caret"></span>');
  submitRentCycle.val('week');
  toggleMenu();
}
