var utils = {};

utils.captureMouse = function (elem) {
  var mouse = { x: 0, y: 0, clicked: false };

  elem.addEventListener('mousedown', function(e) {
    mouse.clicked = true;
  });

  elem.addEventListener('mouseup', function(e) {
    mouse.clicked = false;
  });

  elem.addEventListener('mousemove', function(e) {
    var x, y;

    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    } else {
      x = e.clientX + document.body.scrollLeft + document.documentElemnt.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElemnt.scrollTop;
    }

    x -= elem.offsetLeft;
    y -= elem.offsetTop;
    mouse.x = x;
    mouse.y = y;
  }, false);

  return mouse;
};

utils.captureTouch = function (elem) {
  var touch = { x: null, y: null, isPressed: false };

  elem.addEventListener('touchstart', function(e) {
    e.preventDefault();
    touch.isPressed = true;
  }, false);

  elem.addEventListener('touchend', function(e) {
    touch.isPressed = false;
    touch.x = null;
    touch.y = null;
  }, false);

  elem.addEventListener('touchmove', function(e) {
    var x, y, touch_event = e.touches[0];

    if (touch_event.pageX || touch_event.pageY) {
      x = touch_event.pageX;
      y = touch_event.pageY;
    } else {
      x = touch_event.clientX + document.body.scrollLeft + document.documentElemnt.scrollLeft;
      y = touch_event.clientY + document.body.scrollTop + document.documentElemnt.scrollTop;
    }
    x -= elem.offsetLeft;
    y -= elem.offsetTop;

    touch.x = x;
    touch.y = y;
  }, false);

  return touch;
};
