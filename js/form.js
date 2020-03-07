'use strict';

(function () {
  var MatchPriceToPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
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
  var inputTitle = document.querySelector('#title');
  var inputType = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');
  var inputArrival = document.querySelector('#timein');
  var inputDeparture = document.querySelector('#timeout');
  var form = document.querySelector('.ad-form');

  var toggleFieldsAvailability = function (disabled) {
    var formFieldset = document.querySelector('.ad-form').children;

    window.util.disableElements(formFieldset, disabled);
  };

  var validateGuestsHandler = function () {
    var rooms = parseInt(inputRooms.value, window.util.NUMBER_SYSTEM);
    var guests = parseInt(inputGuests.value, window.util.NUMBER_SYSTEM);

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

  var validateTitleHandler = function () {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Описание должно быть не меннее ' + MIN_TITLE_LENGHT + ' симоволов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Описание не должно привышать ' + MAX_TITLE_LENGHT + ' символов');
    } else {
      inputTitle.setCustomValidity('');
    }
  };

  var validateTypeHandler = function () {
    inputPrice.min = MatchPriceToPrice[inputType.value.toUpperCase()];
    inputPrice.placeholder = MatchPriceToPrice[inputType.value.toUpperCase()];
  };

  var arrivalChangeHandler = function () {
    inputDeparture.value = inputArrival.value;
  };

  var departureChangeHandler = function () {
    inputArrival.value = inputDeparture.value;
  };

  var deactivate = function () {
    form.classList.add('ad-form--disabled');
    form.reset();
  };

  var init = function () {
    inputRooms.addEventListener('change', validateGuestsHandler);
    inputGuests.addEventListener('change', validateGuestsHandler);
    inputTitle.addEventListener('input', validateTitleHandler);
    inputPrice.addEventListener('input', function () {
      if (inputPrice.value > MAX_PRICE) {
        inputPrice.setCustomValidity('Стоимость за ночь не может быть больше ' + MAX_PRICE);
      }
    });
    inputType.addEventListener('input', validateTypeHandler);
    inputArrival.addEventListener('change', arrivalChangeHandler);
    inputDeparture.addEventListener('change', departureChangeHandler);

    var submitFormHandler = function (evt) {
      evt.preventDefault();

      var saveFormHandler = function () {
        deactivate();
        window.map.deactivate();
        window.message.show(window.message.TYPES.SUCCESS);
      };

      var errorFormHandler = function () {
        window.message.show(window.message.TYPES.ERROR);
      };

      window.upload.save(new FormData(form), saveFormHandler, errorFormHandler);
    };

    form.addEventListener('submit', submitFormHandler);

    toggleFieldsAvailability(true);
    validateGuestsHandler();
  };

  window.form = {
    toggleFieldsAvailability: toggleFieldsAvailability,
    init: init
  };
})();
