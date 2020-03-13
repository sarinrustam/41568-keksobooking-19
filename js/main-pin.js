'use strict';

(function () {
  var PIN_MAIN_HALF_WIDTH = 32;
  var MIN_CLIENT_Y = 130;
  var MAX_CLIENT_Y = 630;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var MAP_PIN_HEIGHT = mapPinMain.clientHeight;
  var MAIN_PIN_Y = parseInt(mapPinMain.style.top, window.util.NUMBER_SYSTEM);
  var MAIN_PIN_X = parseInt(mapPinMain.style.left, window.util.NUMBER_SYSTEM);

  var mapPinMainHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var clientWidth = map.clientWidth;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var top;
      var left;

      if (mapPinMain.offsetTop - shift.y <= MIN_CLIENT_Y - MAP_PIN_HEIGHT) {
        top = MIN_CLIENT_Y - MAP_PIN_HEIGHT;
      }

      if (mapPinMain.offsetTop - shift.y >= MAX_CLIENT_Y - MAP_PIN_HEIGHT) {
        top = MAX_CLIENT_Y - MAP_PIN_HEIGHT;
      }

      if (!top) {
        top = mapPinMain.offsetTop - shift.y;
      }

      if (mapPinMain.offsetLeft - shift.x <= -PIN_MAIN_HALF_WIDTH) {
        left = -PIN_MAIN_HALF_WIDTH;
      }

      if (mapPinMain.offsetLeft - shift.x >= clientWidth - PIN_MAIN_HALF_WIDTH) {
        left = clientWidth - PIN_MAIN_HALF_WIDTH;
      }

      if (!left) {
        left = mapPinMain.offsetLeft - shift.x;
      }

      mapPinMain.style.left = left + 'px';
      mapPinMain.style.top = top + 'px';

      window.form.insertAddress((PIN_MAIN_HALF_WIDTH + left) + ', ' + (MAP_PIN_HEIGHT + top));
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var init = function () {
    mapPinMain.addEventListener('mousedown', mapPinMainHandler);
  };

  var reset = function () {
    mapPinMain.style.top = MAIN_PIN_Y + 'px';
    mapPinMain.style.left = MAIN_PIN_X + 'px';
  };

  window.mainPin = {
    init: init,
    reset: reset
  };
})();
