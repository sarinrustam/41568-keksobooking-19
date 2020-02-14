'use strict';

(function () {
  var MATCH_TYPES_TO_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var MATCH_ROOMS_TO_GUESTS = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var MIN_TITLE_LENGHT = 30;
  var MAX_TITLE_LENGHT = 100;
  var MAX_PRICE = 1000000;

  var inputRooms = document.querySelector('#room_number');
  var inputGuests = document.querySelector('#capacity');

  var toggleFieldsAvailability = function (disabled) {
    var formFieldset = document.querySelector('.ad-form').children;

    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = disabled;
    }
  };

  toggleFieldsAvailability(true);

  var validateGuestsHandler = function () {
    var rooms = Number(inputRooms.value);
    var guests = Number(inputGuests.value);

    if (rooms === 1 && !MATCH_ROOMS_TO_GUESTS[rooms].includes(guests)) {
      inputGuests.setCustomValidity('1 комната — «для 1 гостя»');
    } else if (rooms === 2 && !MATCH_ROOMS_TO_GUESTS[rooms].includes(guests)) {
      inputGuests.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
    } else if (rooms === 3 && !MATCH_ROOMS_TO_GUESTS[rooms].includes(guests)) {
      inputGuests.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    } else if (rooms === 100 && !MATCH_ROOMS_TO_GUESTS[rooms].includes(guests)) {
      inputGuests.setCustomValidity('100 комнат — «не для гостей»');
    } else {
      inputGuests.setCustomValidity('');
    }
  };

  validateGuestsHandler();

  inputRooms.addEventListener('change', validateGuestsHandler);
  inputGuests.addEventListener('change', validateGuestsHandler);

  var inputTitle = document.querySelector('#title');

  var validateTitleHandler = function () {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Описание должно быть не меннее ' + MIN_TITLE_LENGHT + ' симоволов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Описание не должно привышать ' + MAX_TITLE_LENGHT + ' символов');
    } else {
      inputTitle.setCustomValidity('');
    }
  };

  inputTitle.addEventListener('input', validateTitleHandler);

  var inputType = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');
  inputPrice.addEventListener('input', function () {
    if (inputPrice.value > MAX_PRICE) {
      inputPrice.setCustomValidity('Стоимость за ночь не может быть больше ' + MAX_PRICE);
    }
  });

  var validateTypeHandler = function () {
    inputPrice.min = MATCH_TYPES_TO_PRICE[inputType.value];
    inputPrice.placeholder = MATCH_TYPES_TO_PRICE[inputType.value];
  };

  inputType.addEventListener('input', validateTypeHandler);

  var inputArrival = document.querySelector('#timein');
  var inputDeparture = document.querySelector('#timeout');

  var arrivalChangeHandler = function () {
    inputDeparture.value = inputArrival.value;
  };

  var departureChangeHandler = function () {
    inputArrival.value = inputDeparture.value;
  };

  inputArrival.addEventListener('change', arrivalChangeHandler);
  inputDeparture.addEventListener('change', departureChangeHandler);

  window.form = {
    toggleFieldsAvailability: toggleFieldsAvailability
  };
})();
