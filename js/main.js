'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_CLIENT_WIDTH = 25;
var PIN_CLIENT_HEIGHT = 70;
var COUNT_ADS = 8;

// функция генерации случайнго числа от и до(например от 1 до 23)
var getRandomNumber = function (from, to) {
  return Math.round(Math.random() * to) + from;
};

// функция генерирования случайного элемента массива
var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

// функция генерирования случайного подмассива
var generateRandomArray = function (array) {
  var newArray = [];

  for (var i = 0; i < array.length; i++) {
    var item = getRandomElement(array);
    if (!newArray.includes(item)) {
      newArray.push(item);
    }
  }
  return newArray;
};
// функция получения рандомного числа от ширины блока с картой
var getRandomClientX = function () {
  var clientX = document.querySelector('.map__overlay').clientWidth;
  return getRandomNumber(1, clientX);
};
// функция генерации обьекта с данными
var generateObject = function (i) {
  var locationX = getRandomClientX();
  var locationY = getRandomNumber(130, 630);

  return {
    author: {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      'title': 'React',
      'address': locationX + ',' + locationY,
      'price': 3500,
      'type': getRandomElement(TYPES),
      'rooms': getRandomElement(ROOMS),
      'guests': 2,
      'checkin': getRandomElement(TIMES),
      'checkout': getRandomElement(TIMES),
      'features': generateRandomArray(FEATURES),
      'description': 'Located beside Victory Square',
      'photos': generateRandomArray(PHOTOS)
    },
    location: {
      'x': locationX,
      'y': locationY
    }
  };
};


var generateAds = function () {
  var ads = [];

  for (var i = 0; i < COUNT_ADS; i++) {
    ads.push(generateObject(i));
  }

  return ads;
};


document.querySelector('.map').classList.remove('map--faded');

var mapPinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// функция создания кнопки-пина и заполнения кнопки данными из массива
var renderPinElement = function (element) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = element.location.x + PIN_CLIENT_WIDTH + 'px';
  pinElement.style.top = element.location.y - PIN_CLIENT_HEIGHT + 'px';

  var pinElementImage = pinElement.querySelector('img');
  pinElementImage.src = element.author.avatar;
  pinElementImage.alt = 'Hello World';

  return pinElement;
};
// функция заполнения блока пинами
var renderPinElements = function () {
  var fragment = document.createDocumentFragment();
  var ads = generateAds();

  for (var j = 0; j < ads.length; j++) {
    fragment.appendChild(renderPinElement(ads[j]));
  }

  mapPinsList.appendChild(fragment);
};

renderPinElements();
