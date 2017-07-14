var thumbPic = $('#thumb-pic');
var thumbNoPic = $('#thumb-no-pic');
var rentalPeriod = $('#rental-period');
var submitImage = $('#submit-image');
var submitRentalPeriod = $('#submit-rental-period');

var popupDialog = $('#popup-dialog');
var popupPic = $('#popup-pic');
var popupNoPic = $('#popup-no-pic');
var popupUrl = $('#popup-url');
var popupDone = $('#popup-done');
var popupCancel = $('#popup-cancel');

var currentThumb;

if (thumbPic.attr('src') == '') {
  thumbNoPic.show();
}
else {
  thumbPic.show();
}

// popupPic.data('sibling', popupNoPic);
// popupNoPic.data('sibling', popupPic);
// thumbPic.data('sibling', thumbNoPic);
// thumbNoPic.data('sibling', thumbPic);

/////////////////////////////////////////////////////////////////
// DEBUG USE ONLY ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// var thumbFromServer = true; if (thumbFromServer) {
//   thumbPic.attr({src: 'https://farm4.staticflickr.com/3232/2678020846_5acd913ba6.jpg', alt: 'https://farm4.staticflickr.com/3232/2678020846_5acd913ba6.jpg'}).show() && thumbNoPic.hide(); } else { thumbPic.attr({src: '', alt: ''}).hide() && thumbNoPic.show(); }
// /////////////////////////////////////////////////////////////////

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

// ERROR: handle an invalid image in the THUMBNAIL PIC
thumbPic.on('error', function() { //console.log('++ INVALID THUMB PIC');
  thumbNoPic.show();
  thumbPic.attr({
    src: '',
    alt: ''
  }).hide();
});

// ERROR: handle an invalid image in the POPUP PIC
popupPic.on('error', function() { //console.log('++ INVALID POPUP PIC');
  popupNoPic.show();
  popupPic.attr({
    src: '',
    alt: ''
  }).hide();
});

// INPUT: handle a change to the POPUP URL
popupUrl.on('input', function() { //console.log('++ POPUP URL HAS CHANGED');
  popupNoPic.hide();
  popupPic.attr({
    src: popupUrl.val(),
    alt: popupUrl.val()
  }).show();
  // popupPic.attr({ src: popupUrl.val(), alt: popupUrl.val() });
});

// CLICK: handle a click on DONE
popupDone.on('click', function() { //console.log('++ POPUP DONE CLICKED');
  // thumbPic.attr({ src: popupUrl.val(), alt: popupUrl.val() });
  if (popupPic.attr('alt') != '') {
    thumbPic.attr({
      src: popupPic.attr('src'),
      alt: popupPic.attr('alt')
    });
    thumbPic.show() && thumbNoPic.hide();
  }
  submitImage.val(thumbPic.attr('src'));
  popupDialog.hide();
});

// CLICK: handle a click on CANCEL
popupCancel.on('click', function() { //console.log('++ POPUP CANCEL CLICKED');
  thumbPic.attr({
    src: currentThumb,
    alt: currentThumb
  });
  popupDialog.hide();
});

// UPDATE: update when a DROPDOWN has been selected
function perNight() {
  rentalPeriod.html('nightly <span class="caret"></span>');
  submitRentalPeriod.val('night');
}

function perWeek() {
  rentalPeriod.html('weekly <span class="caret"></span>');
  submitRentalPeriod.val('week');
}
