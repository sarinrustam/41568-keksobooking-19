'use strict';

var ADS = [];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TYPES_TRANSLATE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var ROOMS = [1, 2, 3, 4, 5];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_CLIENT_WIDTH = 50 / 2;
var PIN_CLIENT_HEIGHT = 70;

// функция генерации случайнго числа от и до(например от 1 до 23)
var getRandom = function (from, to) {
  return Math.round(Math.random() * to) + from;
};

// функция генерирования случайного элемента массива
var getRandomElement = function (array) {
  var i = getRandom(0, array.length - 1);

  return array[i];
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
  return getRandom(1, clientX);
};
// функция генерации обьекта с данными
var generateObject = function (i) {
  var obj = {};

  obj.author = {
    'avatar': 'img/avatars/user0' + (i + 1) + '.png'
  };

  obj.location = {
    'x': getRandomClientX(),
    'y': getRandom(130, 630)
  };

  obj.offer = {
    'title': 'React',
    'address': obj.location.x + ',' + obj.location.y,
    'price': 3500,
    'type': getRandomElement(TYPES),
    'rooms': getRandomElement(ROOMS),
    'guests': 2,
    'checkin': getRandomElement(TIMES),
    'checkout': getRandomElement(TIMES),
    'features': generateRandomArray(FEATURES),
    'description': 'Located beside Victory Square',
    'photos': generateRandomArray(PHOTOS)
  };

  return obj;
};
// создание массива из 8 элементов. Элементами являются 8 рандомных обьектов
for (var i = 0; i < 8; i++) {
  ADS.push(generateObject(i));
}

document.querySelector('.map').classList.remove('map--faded');

var mapPinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// функция создания кнопки-пина и заполнения кнопки данными из массива
var renderPinElement = function (element) {

  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = element.location.x + PIN_CLIENT_WIDTH + 'px';
  // console.log(ADS[j].location.x + 'px');
  pinElement.style.top = element.location.y - PIN_CLIENT_HEIGHT + 'px';

  var pinElementImage = pinElement.querySelector('img');
  pinElementImage.src = element.author.avatar;
  pinElementImage.alt = 'Hello World';

  return pinElement;
};
// функция заполнения блока пинами
var renderPinElements = function () {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < ADS.length; j++) {
    fragment.appendChild(renderPinElement(ADS[j]));
  }

  mapPinsList.appendChild(fragment);
};

renderPinElements();

// module3-task3
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var renderCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  var cardElementTitle = cardElement.querySelector('.popup__title');
  cardElementTitle.textContent = card.offer.title;


  var cardElementAdress = cardElement.querySelector('.popup__text--address');
  if (card.offer.address) {
    cardElementAdress.textContent = card.offer.address;
  } else {
    cardElementAdress.classList.add('hidden');
  }


  var cardElementPrice = cardElement.querySelector('.popup__text--price');
  if (card.offer.price) {
    cardElementPrice.textContent = card.offer.price + ' ₽/ночь';
  } else {
    cardElementPrice.classList.add('hidden');
  }


  var cardElementType = cardElement.querySelector('.popup__type');
  if (card.offer.type) {
    cardElementType.textContent = TYPES_TRANSLATE[card.offer.type];
  } else {
    cardElementType.classList.add('hidden');
  }

  var cardElementCapacity = cardElement.querySelector('.popup__text--capacity');
  if (card.offer.rooms && card.offer.guests) {
    cardElementCapacity.textContent = card.offer.rooms + ' комнаты' + ' для ' + card.offer.guests + ' гостей';
  } else {
    cardElementCapacity.classList.add('hidden');
  }

  var cardElementTime = cardElement.querySelector('.popup__text--time');
  if (card.offer.checkin && card.offer.checkout) {
    cardElementTime.textContent = 'Заезд после ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;
  } else {
    cardElementTime.classList.add('hidden');
  }

  var cardElementFeatures = cardElement.querySelector('.popup__features');
  if (card.offer.features.length) {
    cardElementFeatures.textContent = card.offer.features;
  } else {
    cardElementFeatures.classList.add('hidden');
  }

  var cardElementDescription = cardElement.querySelector('.popup__description');
  if (card.offer.description) {
    cardElementDescription.textContent = card.offer.description;
  } else {
    cardElementDescription.classList.add('hidden');
  }

  var cardElementPhotos = cardElement.querySelector('.popup__photos');
  if (card.offer.photos.length) {
    var photoTemplate = cardElement.querySelector('.popup__photo');
    var photoFragment = document.createDocumentFragment();
    photoTemplate.src = card.offer.photos[0];

    for (var k = 1; k < card.offer.photos.length; k++) {
      var cardElementPhoto = photoTemplate.cloneNode();
      cardElementPhoto.src = card.offer.photos[k];
      photoFragment.appendChild(cardElementPhoto);
    }

    cardElementPhotos.appendChild(photoFragment);
  } else {
    cardElementPhotos.classList.add('hidden');
  }

  var cardElementAvatar = cardElement.querySelector('.popup__avatar');
  cardElementAvatar.src = card.author.avatar;

  return cardElement;
};

var mapFilterContainer = document.querySelector('.map__filters-container');

mapFilterContainer.before(renderCard(ADS[0]));
