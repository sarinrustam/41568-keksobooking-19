'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var RESPONSE_TYPE = 'json';
  var STATUS_200 = 200;
  var METHOD_GET = 'GET';

  var load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_200) {
        successHandler(xhr.response);
      } else {
        errorHandler('Error: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.open(METHOD_GET, URL);
    xhr.send();
  };

  window.upload = {
    load: load
  };
}());
