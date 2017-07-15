var thumbPic = $('#thumb-pic');
var thumbNoPic = $('#thumb-no-pic');
var rentCycle = $('#rent-cycle');
var submitPic = $('#submit-pic');
var submitRentCycle = $('#submit-rent-cycle');

var popupDialog = $('#popup-dialog');
var popupPic = $('#popup-pic');
var popupNoPic = $('#popup-no-pic');
var popupUrl = $('#popup-url');
var popupDone = $('#popup-done');
var popupCancel = $('#popup-cancel');

var currentThumb;

if (thumbPic.attr('src') == '') {
  thumbNoPic.css('display', 'block');
}
else {
  thumbPic.css('display', 'block');
}

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
  submitPic.val(thumbPic.attr('src'));
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
  rentCycle.html('nightly <span class="caret"></span>');
  submitRentCycle.val('night');
}

function perWeek() {
  rentCycle.html('weekly <span class="caret"></span>');
  submitRentCycle.val('week');
}
