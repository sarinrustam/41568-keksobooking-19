'use strict';
(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [1, 2, 3, 4, 5];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var COUNT_ADS = 8;

  var clientX = document.querySelector('.map__overlay').clientWidth;

  var getRandomClientX = function () {
    return window.util.getRandomNumber(1, clientX);
  };

  var generateObject = function (i) {
    var locationX = getRandomClientX();
    var locationY = window.util.getRandomNumber(130, 630);

    return {
      author: {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        'title': 'React',
        'address': locationX + ',' + locationY,
        'price': 3500,
        'type': window.util.getRandomElement(TYPES),
        'rooms': window.util.getRandomElement(ROOMS),
        'guests': 2,
        'checkin': window.util.getRandomElement(TIMES),
        'checkout': window.util.getRandomElement(TIMES),
        'features': window.util.generateRandomArray(FEATURES),
        'description': 'Located beside Victory Square',
        'photos': window.util.generateRandomArray(PHOTOS)
      },
      location: {
        'x': locationX,
        'y': locationY
      }
    };
  };

  var generate = function () {
    var ads = [];

    for (var i = 0; i < COUNT_ADS; i++) {
      ads.push(generateObject(i));
    }

    return ads;
  };

  window.data = {
    generate: generate
  };
})();
