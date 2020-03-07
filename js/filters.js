'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var housingType = form.querySelector('#housing-type');
  var TYPE_ANY = 'any';

  var typeChangeHandler = function (evt) {
    var value = evt.target.value;
    window.filters.typeChangeHandler(value);
  };

  var init = function () {
    housingType.addEventListener('change', typeChangeHandler);
  };

  window.filters = {
    typeChangeHandler: function () {},
    TYPE_ANY: TYPE_ANY,
    init: init
  };
}());
