'use strict';

(function () {
  var RESPONSE_TYPE = 'json';
  var STATUS_OK = 200;
  var Methods = {
    GET: 'GET',
    POST: 'POST'
  };
  var Urls = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var request = function (method, successHandler, errorHandler, data) {
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

    xhr.open(method, Urls[method]);

    if (method === Methods.POST) {
      xhr.send(data);
    }

    if (method === Methods.GET) {
      xhr.send();
    }
  };

  var load = function (successHandler, errorHandler) {
    request(Methods.GET, successHandler, errorHandler);
  };

  var save = function (data, successHandler, errorHandler) {
    request(Methods.POST, successHandler, errorHandler, data);
  };

  window.upload = {
    load: load,
    save: save
  };
}());
