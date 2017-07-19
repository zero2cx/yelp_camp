var popupDialog = $('#popup-dialog');
var popupPic = $('#popup-pic');
var popupNoPic = $('#popup-no-pic');
var popupUrl = $('#popup-url');
var popupDone = $('#popup-done');
var popupCancel = $('#popup-cancel');
var thumbPic = $('#thumb-pic');
var thumbNoPic = $('#thumb-no-pic');
var rentCycleButton = $('#rent-cycle-button');
var rentCycleMenu = $('#rent-cycle-menu');
var submitRentCycle = $('#submit-rent-cycle');
var submitPic = $('#submit-pic');
var currentThumb;

////////////////////////////
// DEBUG ONLY //////////////
////////////////////////////
// var thumbFromServer = false; if (thumbFromServer) { thumbPic.attr({src: 'https://farm4.staticflickr.com/3232/2678020846_5acd913ba6.jpg', alt: 'https://farm4.staticflickr.com/3232/2678020846_5acd913ba6.jpg'}).show() && thumbNoPic.hide(); } else { thumbPic.attr({src: '', alt: ''}).hide() && thumbNoPic.show(); }

//////////////////////////////////////////////////////
// CLICK: handle a click on the THUMBNAIL PIC
thumbPic.on('click', function() { //console.log('++ IMAGE THUMBNAIL CLICKED');
  currentThumb = thumbPic.attr('alt');
  popupUrl.val(currentThumb);
  popupPic.attr({
    src: currentThumb,
    alt: currentThumb
  }).show() && popupNoPic.hide();
  popupDialog.show();
});

//////////////////////////////////////////////////////
// CLICK: handle a click on the NO_PIC ICON
thumbNoPic.on('click', function() { //console.log('++ NO-PIC THUMBNAIL CLICKED');
  currentThumb = '';
  popupUrl.val(currentThumb);
  popupPic.attr({
    src: currentThumb,
    alt: currentThumb
  }).hide() && popupNoPic.show();
  popupDialog.show();
});

//////////////////////////////////////////////////////
// ERROR: hide an invalid image in the THUMBNAIL PIC
thumbPic.on('error', function() { //console.log('++ INVALID THUMB PIC');
  thumbNoPic.show();
  thumbPic.attr({
    src: '',
    alt: ''
  }).hide();
});

//////////////////////////////////////////////////////
// ERROR: hide an invalid image in the POPUP PIC
popupPic.on('error', function() { //console.log('++ INVALID POPUP PIC');
  popupNoPic.show();
  popupPic.attr({
    src: '',
    alt: ''
  }).hide();
});

//////////////////////////////////////////////////////
// INPUT: attempt to display the IMAGE URL
popupUrl.on('input', function() { //console.log('++ POPUP URL HAS CHANGED');
  popupNoPic.hide();
  popupPic.attr({
    src: popupUrl.val(),
    alt: popupUrl.val()
  }).show();
  // popupPic.attr({ src: popupUrl.val(), alt: popupUrl.val() });
});

//////////////////////////////////////////////////////
// CLICK: handle a click on DONE BUTTON
popupDone.on('click', function() { //console.log('++ POPUP DONE CLICKED');
  // thumbPic.attr({ src: popupUrl.val(), alt: popupUrl.val() });
  if (popupPic.attr('alt') != '') {
    thumbPic.attr({
      src: popupPic.attr('src'),
      alt: popupPic.attr('alt')
    });
    thumbPic.show() && thumbNoPic.hide();
  }
  popupDialog.hide();
});

//////////////////////////////////////////////////////
// CLICK: handle a click on CANCEL BUTTON
popupCancel.on('click', function() { //console.log('++ POPUP CANCEL CLICKED');
  thumbPic.attr({
    src: currentThumb,
    alt: currentThumb
  });
  popupDialog.hide();
});

//////////////////////////////////////////////////////
function toggleMenu() {
  rentCycleMenu.toggle();
}

//////////////////////////////////////////////////////
function perNight() {
  rentCycleButton.html('nightly&nbsp;<span class="caret"></span>');
  submitRentCycle.val('week');
  rentCycleMenu.toggle();
}

//////////////////////////////////////////////////////
function perWeek() {
  rentCycleButton.html('weekly&nbsp;<span class="caret"></span>');
  submitRentCycle.val('week');
  rentCycleMenu.toggle();
}
