'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGTH = 65;

  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapSection = document.querySelector('.map');

  var activatePageHandler = function (evt) {
    if (evt.button === window.util.BUTTONS.LMB || evt.key === window.util.BUTTONS.ENT) {
      mapSection.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.form.toggleFieldsAvailability(false);
      window.pin.render(window.data.ads);
      mapPinMain.removeEventListener('mousedown', activatePageHandler);
      mapPinMain.removeEventListener('keydown', activatePageHandler);
    }
  };

  var getMainPinCoordinate = function () {
    var pinMainLeft = parseInt(mapPinMain.style.left, 10);
    var pinMainTop = parseInt(mapPinMain.style.top, 10);

    if (mapSection.classList.contains('map--fadded')) {
      return Math.round(pinMainLeft + PIN_MAIN_WIDTH / 2) + ', ' + Math.round(pinMainTop + PIN_MAIN_HEIGTH / 2);
    }

    return Math.round(pinMainLeft + PIN_MAIN_WIDTH / 2) + ', ' + Math.round(pinMainTop + PIN_MAIN_HEIGTH);
  };

  var setMainPinCoordinateHandler = function () {
    var inputAddress = document.querySelector('#address');
    inputAddress.value = getMainPinCoordinate();
  };

  setMainPinCoordinateHandler();

  mapPinMain.addEventListener('mouseup', activatePageHandler);
  mapPinMain.addEventListener('mouseup', setMainPinCoordinateHandler);
  mapPinMain.addEventListener('keydown', activatePageHandler);
})();
