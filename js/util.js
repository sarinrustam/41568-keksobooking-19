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

  window.util = {
    BUTTONS: Buttons,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    generateRandomArray: generateRandomArray,
    disableElements: disableElements
  };
})();
