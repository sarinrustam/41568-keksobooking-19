'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGTH = 65;

  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapSection = document.querySelector('.map');

  var activatePageHandler = function (evt) {
    if (evt.button === window.util.BUTTONS.LMB || evt.key === window.util.BUTTONS.ENT) {
      var successHandler = function (response) {
        window.pin.render(response);
      };

      var errorHandler = function (errorMessage) {
        window.util.showMessage(errorMessage, 'tomato');
      };

      mapSection.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.form.toggleFieldsAvailability(false);
      mapPinMain.removeEventListener('mousedown', activatePageHandler);
      mapPinMain.removeEventListener('keydown', activatePageHandler);
      window.upload.load(successHandler, errorHandler);
    }
  };

  var deactivatePage = function () {
    mapSection.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.toggleFieldsAvailability(true);
    mapPinMain.addEventListener('mousedown', activatePageHandler);
    mapPinMain.addEventListener('keydown', activatePageHandler);
    window.pin.remove();
    window.mainPin.reset();
  };

  var getMainPinCoordinate = function () {
    var pinMainLeft = parseInt(mapPinMain.style.left, 10);
    var pinMainTop = parseInt(mapPinMain.style.top, 10);
    var mapFadded = mapSection.classList.contains('map--fadded');

    var pinY = mapFadded ? pinMainTop + PIN_MAIN_HEIGTH / 2 : pinMainTop + PIN_MAIN_HEIGTH;

    return Math.round(pinMainLeft + PIN_MAIN_WIDTH / 2) + ', ' + Math.round(pinY);
  };

  var setMainPinCoordinateHandler = function () {
    var inputAddress = document.querySelector('#address');
    inputAddress.value = getMainPinCoordinate();
  };

  var init = function () {
    mapPinMain.addEventListener('mouseup', activatePageHandler);
    mapPinMain.addEventListener('mouseup', setMainPinCoordinateHandler);
    mapPinMain.addEventListener('keydown', activatePageHandler);

    setMainPinCoordinateHandler();
    window.mainPin.init();
  };

  window.map = {
    init: init,
    deactivate: deactivatePage
  };

})();
