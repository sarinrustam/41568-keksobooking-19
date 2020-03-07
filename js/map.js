'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGTH = 65;

  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapSection = document.querySelector('.map');
  var pinsData = [];
  var typeFilter;
  var priceFilter;
  var roomsFilter;
  var guestsFilter;
  var featuresFilter;

  var getFilterPrice = function (price) {
    var filter;
    if (price > window.filters.PRICE.LOW) {
      filter = window.filters.PRICE_NAMES.LOW;
    }
    if (price > window.filters.PRICE.MIDDLE) {
      filter = window.filters.PRICE_NAMES.MIDDLE;
    }
    if (price > window.filters.PRICE.HIGH) {
      filter = window.filters.PRICE_NAMES.HIGH;
    }
    return filter;
  };

  var updatePins = function () {
    var updatedPinsData = pinsData.filter(function (item) {
      if (typeFilter) {
        if (typeFilter !== item.offer.type && typeFilter !== window.filters.TYPE_ANY) {
          return false;
        }
      }
      if (priceFilter) {
        if (priceFilter !== getFilterPrice(item.offer.price) && priceFilter !== window.filters.TYPE_ANY) {
          return false;
        }
      }
      if (roomsFilter) {
        if (roomsFilter !== item.offer.rooms.toString() && roomsFilter !== window.filters.TYPE_ANY) {
          return false;
        }
      }
      if (guestsFilter) {
        if (guestsFilter !== item.offer.guests.toString() && guestsFilter !== window.filters.TYPE_ANY) {
          return false;
        }
      }
      if (featuresFilter && featuresFilter.length) {
        var exist = featuresFilter.every(function (element) {
          return item.offer.features.includes(element);
        });

        if (!exist) {
          return false;
        }
      }
      return true;
    });

    window.pin.render(updatedPinsData);
  };

  window.filters.typeChangeHandler = window.debounce(function (type) {
    typeFilter = type;
    window.card.remove();
    updatePins();
  });

  window.filters.priceChangeHandler = window.debounce(function (price) {
    priceFilter = price;
    window.card.remove();
    updatePins();
  });

  window.filters.roomsChangeHandler = window.debounce(function (rooms) {
    roomsFilter = rooms;
    window.card.remove();
    updatePins();
  });

  window.filters.guestsChangeHandler = window.debounce(function (guests) {
    guestsFilter = guests;
    window.card.remove();
    updatePins();
  });

  window.filters.inputChangeHandler = window.debounce(function (value) {
    featuresFilter = value;
    window.card.remove();
    updatePins();
  });

  var activatePageHandler = function (evt) {
    if (evt.button === window.util.BUTTONS.LMB || evt.key === window.util.BUTTONS.ENT) {
      var successHandler = function (response) {
        pinsData = response;
        updatePins();
        window.filters.init();
      };

      var errorHandler = function (errorMessage) {
        window.util.showMessage(errorMessage);
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
    var pinMainLeft = parseInt(mapPinMain.style.left, window.util.NUMBER_SYSTEM);
    var pinMainTop = parseInt(mapPinMain.style.top, window.util.NUMBER_SYSTEM);
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
