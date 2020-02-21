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

  var showMessage = function (text, color) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color:' + color + 'red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = text;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.util = {
    BUTTONS: Buttons,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    generateRandomArray: generateRandomArray,
    disableElements: disableElements,
    showMessage: showMessage
  };
})();
