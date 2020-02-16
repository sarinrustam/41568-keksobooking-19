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

  window.util = {
    BUTTONS: Buttons,
    getRandomNumber: function (from, to) {
      return Math.round(Math.random() * to) + from;
    },
    getRandomElement: function (array) {
      return array[window.util.getRandomNumber(0, array.length - 1)];
    },
    generateRandomArray: generateRandomArray
  };
})();
