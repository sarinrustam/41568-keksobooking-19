'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var type = form.querySelector('#housing-type');
  var price = form.querySelector('#housing-price');
  var rooms = form.querySelector('#housing-rooms');
  var guests = form.querySelector('#housing-guests');
  var features = form.querySelector('.map__features');
  var featuresInputs = features.querySelectorAll('.map__checkbox');
  var featuresValues = [];

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

  window.filters = {
    typeChangeHandler: function () {},
    priceChangeHandler: function () {},
    roomsChangeHandler: function () {},
    guestsChangeHandler: function () {},
    inputChangeHandler: function () {},
    TYPE_ANY: 'any',
    PRICE: PriceFilters,
    PRICE_NAMES: PriceFilterNames
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

  var init = function () {
    type.addEventListener('change', typeChangeHandler);
    price.addEventListener('change', priceChangeHandler);
    rooms.addEventListener('change', roomsChangeHandler);
    guests.addEventListener('change', guestsChangeHandler);
    featuresInputs.forEach(function (item) {
      item.addEventListener('change', inputChangeHandler);
    });
  };

  window.filters.init = init;
}());
