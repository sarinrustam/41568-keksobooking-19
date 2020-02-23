'use strict';
(function () {
  var Buttons = {
    LMB: 0,
    ENT: 'Enter',
    ESC: 'Escape'
  };

  var MessageType = {
    SUCCESS: 'success',
    ERROR: 'error'
  };

  var messageTemplateSuccess = document.querySelector('#success').content.querySelector('.success');
  var messageTemplateError = document.querySelector('#error').content.querySelector('.error');

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

  var renderMessage = function (messageType) {
    var messageTemplate = messageType === MessageType.SUCCESS ? messageTemplateSuccess : messageTemplateError;
    var messageElement = messageTemplate.cloneNode(true);
    var main = document.querySelector('main');
    var errorButton = messageElement.querySelector('.error__button');

    var messageClickHandler = function () {
      main.removeChild(messageElement);
      if (errorButton) {
        errorButton.removeEventListener('click', messageClickHandler);
      }

      document.removeEventListener('click', messageClickHandler);
      document.removeEventListener('keydown', messageKeydownHandler);
    };

    var messageKeydownHandler = function (evt) {
      if (evt.key === window.util.BUTTONS.ESC) {
        messageClickHandler();
      }
    };

    document.addEventListener('click', messageClickHandler);
    document.addEventListener('keydown', messageKeydownHandler);

    if (errorButton) {
      errorButton.removeEventListener('click', messageClickHandler);
    }

    main.appendChild(messageElement);
  };

  window.util = {
    BUTTONS: Buttons,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    generateRandomArray: generateRandomArray,
    disableElements: disableElements,
    showMessage: showMessage,
    MESSAGE_TYPE: MessageType,
    renderMessage: renderMessage
  };
})();
