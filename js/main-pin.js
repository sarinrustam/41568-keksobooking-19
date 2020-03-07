'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var MIN_CLIENT_Y = 130;
  var MAX_CLIENT_Y = 630;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var MAIN_PIN_Y = parseInt(mapPinMain.style.top, window.util.NUMBER_SYSTEM);
  var MAIN_PIN_X = parseInt(mapPinMain.style.left, window.util.NUMBER_SYSTEM);

  var mapPinMainHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var clientWidth = map.clientWidth;

    var dragged = false;

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

      if (mapPinMain.offsetTop - shift.y < MIN_CLIENT_Y) {
        mapPinMain.style.top = MIN_CLIENT_Y + 'px';
      } else if (mapPinMain.offsetTop - shift.y > MAX_CLIENT_Y) {
        mapPinMain.style.top = MAX_CLIENT_Y + 'px';
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      if (clientWidth - PIN_MAIN_WIDTH / 2 < mapPinMain.offsetLeft - shift.x) {
        mapPinMain.style.left = clientWidth - PIN_MAIN_WIDTH / 2 + 'px';
      } else if (mapPinMain.offsetLeft - shift.x < 0) {
        mapPinMain.style.left = -PIN_MAIN_WIDTH / 2 + 'px';
      } else {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var clickDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener('click', clickDefaultHandler);
        };
        mapPinMain.addEventListener('click', clickDefaultHandler);
      }
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
