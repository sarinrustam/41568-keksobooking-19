'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://js.dump.academy/keksobooking';
  var RESPONSE_TYPE = 'json';
  var STATUS_OK = 200;
  var METHOD_GET = 'GET';

  var load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
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

  var save = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        successHandler(xhr.response);
      } else {
        errorHandler('Error: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  window.upload = {
    load: load,
    save: save
  };
}());
