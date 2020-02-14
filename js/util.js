'use strict';
(function () {
  var BUTTONS = {
    LMB: 0,
    ENT: 'Enter',
    ESC: 'Escape'
  };

  window.util = {
    BUTTONS: BUTTONS,
    getRandomNumber: function (from, to) {
      return Math.round(Math.random() * to) + from;
    },
    getRandomElement: function (array) {
      return array[window.util.getRandomNumber(0, array.length - 1)];
    }
  };
})();
