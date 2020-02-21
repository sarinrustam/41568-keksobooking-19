'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  var load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successHandler(xhr.response);
      } else {
        errorHandler('Error: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  window.upload = {
    load: load
  };
}());