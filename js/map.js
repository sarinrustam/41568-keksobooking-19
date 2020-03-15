'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapSection = document.querySelector('.map');
  var pinsData = [];
  var typeFilter = window.filters.TYPE_ANY;
  var priceFilter = window.filters.TYPE_ANY;
  var roomsFilter = window.filters.TYPE_ANY;
  var guestsFilter = window.filters.TYPE_ANY;
  var featuresFilter = [];

  var getFilterPrice = function (item) {
    var filter;
    if (item.offer.price > window.filters.PRICE.LOW) {
      filter = window.filters.PRICE_NAMES.LOW;
    }
    if (item.offer.price > window.filters.PRICE.MIDDLE) {
      filter = window.filters.PRICE_NAMES.MIDDLE;
    }
    if (item.offer.price > window.filters.PRICE.HIGH) {
      filter = window.filters.PRICE_NAMES.HIGH;
    }

    return priceFilter && (priceFilter === filter || priceFilter === window.filters.TYPE_ANY);
  };

  var getFilterType = function (item) {
    return typeFilter && (typeFilter === item.offer.type || typeFilter === window.filters.TYPE_ANY);
  };

  var getFilterRooms = function (item) {
    return roomsFilter && (roomsFilter === item.offer.rooms.toString() || roomsFilter === window.filters.TYPE_ANY);
  };

  var getFilterGuests = function (item) {
    return guestsFilter && (guestsFilter === item.offer.guests.toString() || guestsFilter === window.filters.TYPE_ANY);
  };

  var getFilterFeatures = function (item) {
    if (featuresFilter && featuresFilter.length) {
      var exist = featuresFilter.every(function (element) {
        return item.offer.features.includes(element);
      });

      if (!exist) {
        return false;
      }
    }
    return true;
  };

  var updatePins = function () {
    var updatedPinsData = pinsData.filter(function (item) {
      return getFilterType(item) && getFilterPrice(item) && getFilterRooms(item) && getFilterGuests(item) && getFilterFeatures(item);
    });

    window.pin.render(updatedPinsData);
  };

  var filterChangeHandler = function () {
    window.card.remove();
    updatePins();
  };

  window.filters.typeChangeHandler = window.debounce(function (type) {
    typeFilter = type;
    filterChangeHandler();
  });

  window.filters.priceChangeHandler = window.debounce(function (price) {
    priceFilter = price;
    filterChangeHandler();
  });

  window.filters.roomsChangeHandler = window.debounce(function (rooms) {
    roomsFilter = rooms;
    filterChangeHandler();
  });

  window.filters.guestsChangeHandler = window.debounce(function (guests) {
    guestsFilter = guests;
    filterChangeHandler();
  });

  window.filters.inputChangeHandler = window.debounce(function (value) {
    featuresFilter = value;
    filterChangeHandler();
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
      mapPinMain.removeEventListener('mousedown', activatePageHandler);
      mapPinMain.removeEventListener('keydown', activatePageHandler);
      window.upload.load(successHandler, errorHandler);
      window.form.init();
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
    typeFilter = window.filters.TYPE_ANY;
    priceFilter = window.filters.TYPE_ANY;
    roomsFilter = window.filters.TYPE_ANY;
    guestsFilter = window.filters.TYPE_ANY;
    featuresFilter = [];
  };

  var init = function () {
    mapPinMain.addEventListener('mouseup', activatePageHandler);
    mapPinMain.addEventListener('keydown', activatePageHandler);

    window.mainPin.init();
  };

  window.map = {
    init: init,
    deactivate: deactivatePage
  };

})();
