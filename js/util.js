'use strict';
(function () {
  var Buttons = {
    LMB: 0,
    ENT: 'Enter',
    ESC: 'Escape'
  };
  var NUMBER_SYSTEM = 10;

  var getRandomNumber = function (from, to) {
    return Math.round(Math.random() * to) + from;
  };

  var getRandomElement = function (array) {
    return array[window.util.getRandomNumber(0, array.length - 1)];
  };

  var disableElements = function (arrElements, disabled) {
    arrElements.forEach(function (item) {
      item.disabled = disabled;
    });
  };

  var showMessage = function (text) {
    var node = document.createElement('div');
    node.classList.add('error__message');
    node.textContent = text;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.util = {
    BUTTONS: Buttons,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    disableElements: disableElements,
    showMessage: showMessage,
    NUMBER_SYSTEM: NUMBER_SYSTEM
  };
})();
