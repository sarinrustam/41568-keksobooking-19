'use strict';

(function () {
  var messageTemplateSuccess = document.querySelector('#success').content.querySelector('.success');
  var messageElementSuccess = messageTemplateSuccess.cloneNode(true);
  var messageTemplateError = document.querySelector('#error').content.querySelector('.error');
  var messageElementError = messageTemplateError.cloneNode(true);


  var renderMessage = function (messageType) {
    var messageElement = messageType === window.util.MESSAGE_TYPE.SUCCESS ? messageElementSuccess : messageElementError;
    var main = document.querySelector('main');
    var errorButton = messageElement.querySelector('.error__button');

    var messageClickHandler = function () {
      hideMessage(messageType);
    };

    var messageKeydownHandler = function (evt) {
      if (evt.key === window.util.BUTTONS.ESC) {
        messageClickHandler();
      }
    };

    document.addEventListener('click', messageClickHandler);
    document.addEventListener('keydown', messageKeydownHandler);

    if (errorButton) {
      errorButton.addEventListener('click', messageClickHandler);
    }

    messageElement.classList.add('hidden');
    main.appendChild(messageElement);
  };

  var showMessage = function (messageType) {
    var messageElement = messageType === window.util.MESSAGE_TYPE.SUCCESS ? messageElementSuccess : messageElementError;
    messageElement.classList.remove('hidden');
  };

  var hideMessage = function (messageType) {
    var messageElement = messageType === window.util.MESSAGE_TYPE.SUCCESS ? messageElementSuccess : messageElementError;
    messageElement.classList.add('hidden');
  };

  window.message = {
    init: renderMessage,
    show: showMessage
  };
}());
