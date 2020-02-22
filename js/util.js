'use strict';
(function () {
  var Buttons = {
    LMB: 0,
    ENT: 'Enter',
    ESC: 'Escape'
  };

  var generateRandomArray = function (array) {
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
      var item = window.util.getRandomElement(array);
      if (!newArray.includes(item)) {
        newArray.push(item);
      }
    }
    return newArray;
  };

  var getRandomNumber = function (from, to) {
    return Math.round(Math.random() * to) + from;
  };

  var getRandomElement = function (array) {
    return array[window.util.getRandomNumber(0, array.length - 1)];
  };

  var disableElements = function (arrElements, disabled) {
    for (var i = 0; i < arrElements.length; i++) {
      arrElements[i].disabled = disabled;
    }
  };

  var showMessage = function (text) {
    var node = document.createElement('div');
    node.classList.add('error__message');
    node.textContent = text;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var renderMessageSuccess = function () {
    var messageTemplate = document.querySelector('#success').content.querySelector('.success');
    var messageElement = messageTemplate.cloneNode(true);

    var messageClickHandler = function () {
      document.body.removeChild(messageElement);
      document.removeEventListener('click', messageClickHandler);
      document.removeEventListener('keydown', messageKeydownHandler);
    };

    var messageKeydownHandler = function (evt) {
      if (evt.key === window.util.BUTTONS.ESC) {
        document.body.removeChild(messageElement);
        document.removeEventListener('click', messageClickHandler);
        document.removeEventListener('keydown', messageKeydownHandler);
      }
    };

    document.addEventListener('click', messageClickHandler);
    document.addEventListener('keydown', messageKeydownHandler);
    document.body.appendChild(messageElement);
  };

  var renderMessageError = function () {
    var messageTemplate = document.querySelector('#error').content.querySelector('.error');
    var messageElement = messageTemplate.cloneNode(true);
    var errorButton = messageElement.querySelector('.error__button');
    var main = document.querySelector('main');

    var errorClickHandler = function () {
      main.removeChild(messageElement);

      errorButton.removeEventListener('click', errorClickHandler);
      document.removeEventListener('click', errorClickHandler);
      document.removeEventListener('keydown', errorKeydownHandler);
    };

    var errorKeydownHandler = function (evt) {
      if (evt.key === window.util.BUTTONS.ESC) {
        errorClickHandler();
      }
    };

    errorButton.addEventListener('click', errorClickHandler);
    document.addEventListener('click', errorClickHandler);
    document.addEventListener('keydown', errorKeydownHandler);

    main.appendChild(messageElement);
  };

  window.util = {
    BUTTONS: Buttons,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    generateRandomArray: generateRandomArray,
    disableElements: disableElements,
    showMessage: showMessage,
    renderMessageSuccess: renderMessageSuccess,
    renderMessageError: renderMessageError
  };
})();
