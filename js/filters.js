'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var housingType = form.querySelector('#housing-type');
  var housingPrice = form.querySelector('#housing-price');
  var housingRooms = form.querySelector('#housing-rooms');
  var housingGuests = form.querySelector('#housing-guests');
  var features = form.querySelector('.map__features');
  var housingFeaturesInputs = features.querySelectorAll('.map__checkbox');
  var featuresValues = [];
  var TYPE_ANY = 'any';

  var PriceFilters = {
    LOW: 0,
    MIDDLE: 10000,
    HIGH: 50000
  };
  var PriceFilterNames = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var typeChangeHandler = function (evt) {
    var value = evt.target.value;
    window.filters.typeChangeHandler(value);
  };

  var priceChangeHandler = function (evt) {
    var value = evt.target.value;
    window.filters.priceChangeHandler(value);
  };
  var roomsChangeHandler = function (evt) {
    var value = evt.target.value;
    window.filters.roomsChangeHandler(value);
  };

  var guestsChangeHandler = function (evt) {
    var value = evt.target.value;
    window.filters.guestsChangeHandler(value);
  };

  var inputChangeHandler = function (evt) {
    if (evt.target.checked) {
      featuresValues.push(evt.target.value);
    } else {
      if (featuresValues.includes(evt.target.value)) {
        featuresValues.splice(featuresValues.indexOf(evt.target.value), 1);
      }
    }
    window.filters.inputChangeHandler(featuresValues);
  };

  var resetForm = function () {
    form.reset();
  };

  var init = function () {
    housingType.addEventListener('change', typeChangeHandler);
    housingPrice.addEventListener('change', priceChangeHandler);
    housingRooms.addEventListener('change', roomsChangeHandler);
    housingGuests.addEventListener('change', guestsChangeHandler);
    housingFeaturesInputs.forEach(function (item) {
      item.addEventListener('change', inputChangeHandler);
    });
  };

  window.filters = {
    typeChangeHandler: function () {},
    priceChangeHandler: function () {},
    roomsChangeHandler: function () {},
    guestsChangeHandler: function () {},
    inputChangeHandler: function () {},
    TYPE_ANY: TYPE_ANY,
    PRICE: PriceFilters,
    PRICE_NAMES: PriceFilterNames,
    reset: resetForm,
    init: init
  };
}());
