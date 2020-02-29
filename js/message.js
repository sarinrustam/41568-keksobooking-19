'use strict';

(function () {
  var Types = {
    SUCCESS: 'success',
    ERROR: 'error'
  };

  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var elementSuccess = templateSuccess.cloneNode(true);
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var elementError = templateError.cloneNode(true);


  var render = function (type) {
    var element = type === Types.SUCCESS ? elementSuccess : elementError;
    var main = document.querySelector('main');
    var errorButton = element.querySelector('.error__button');

    var clickHandler = function () {
      hide(type);
    };

    var keydownHandler = function (evt) {
      if (evt.key === window.util.BUTTONS.ESC) {
        clickHandler();
      }
    };

    document.addEventListener('click', clickHandler);
    document.addEventListener('keydown', keydownHandler);

    if (errorButton) {
      errorButton.addEventListener('click', clickHandler);
    }

    element.classList.add('hidden');
    main.appendChild(element);
  };

  var show = function (type) {
    var element = type === Types.SUCCESS ? elementSuccess : elementError;
    element.classList.remove('hidden');
  };

  var hide = function (type) {
    var element = type === Types.SUCCESS ? elementSuccess : elementError;
    element.classList.add('hidden');
  };

  window.message = {
    init: render,
    show: show,
    TYPES: Types,
  };
}());
