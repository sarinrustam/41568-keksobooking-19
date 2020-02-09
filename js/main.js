'use strict';

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
var PIN_CLIENT_WIDTH = 25;
var PIN_CLIENT_HEIGHT = 70;
var COUNT_ADS = 8;
var ENUM_BUTTONS = {
  LMB: 0,
  ENT: 'Enter',
  ESC: 'Escape'
};
var MIN_TITLE_LENGHT = 30;
var MAX_TITLE_LENGHT = 100;
var MAX_PRICE = 1000000;
var pinMainWidth = 65;
var pinMainHeight = 65;

var mapPinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
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

var clientX = document.querySelector('.map__overlay').clientWidth;
var getRandomClientX = function () {
  return getRandomNumber(1, clientX);
};

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

var renderPinElement = function (element) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = element.location.x + PIN_CLIENT_WIDTH + 'px';
  pinElement.style.top = element.location.y - PIN_CLIENT_HEIGHT + 'px';

  var pinElementImage = pinElement.querySelector('img');
  pinElementImage.src = element.author.avatar;
  pinElementImage.alt = element.offer.title;

  var onPopupOpen = function () {
    var mapFilterContainer = document.querySelector('.map__filters-container');
    mapFilterContainer.before(renderCard(element));
  };

  pinElement.addEventListener('click', onPopupOpen);
  pinElement.addEventListener('keydown', function (evt) {
    if (evt.key === ENUM_BUTTONS.ENT) {
      onPopupOpen();
    }
  });
  return pinElement;
};

var ads = generateAds();

var renderPinElements = function () {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < ads.length; j++) {
    fragment.appendChild(renderPinElement(ads[j]));
  }

  mapPinsList.appendChild(fragment);
};


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

  var cardPopupClose = cardElement.querySelector('.popup__close');

  var onClosePopup = function () {
    cardElement.parentNode.removeChild(cardElement);
  };

  cardPopupClose.addEventListener('click', onClosePopup);
  cardPopupClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENUM_BUTTONS.ESC) {
      onClosePopup();
    }
  });

  var currentMapCard = document.querySelector('.map__card');

  if (currentMapCard) {
    currentMapCard.parentNode.removeChild(currentMapCard);
  }

  return cardElement;
};

var disabledFieldsets = function (disabled) {
  var formFieldset = document.querySelector('.ad-form').children;

  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = disabled;
  }
};

disabledFieldsets(true);

var mapPinMain = document.querySelector('.map__pin--main');
// var mapFilters = document.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
var mapSection = document.querySelector('.map');

var getActivePage = function (evt) {
  if (evt.button === ENUM_BUTTONS.LMB || evt.key === ENUM_BUTTONS.ENT) {
    mapSection.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    disabledFieldsets(false);
    renderPinElements();
    mapPinMain.removeEventListener('mousedown', getActivePage);
    mapPinMain.removeEventListener('keydown', getActivePage);
  }
};

var getMainPinCoordinate = function () {
  var pinMainLeft = parseInt(mapPinMain.style.left, 10);
  var pinMainTop = parseInt(mapPinMain.style.top, 10);

  if (mapSection.classList.contains('map--fadded')) {
    return Math.round(pinMainLeft + pinMainWidth / 2) + ', ' + Math.round(pinMainTop + pinMainHeight / 2);
  }

  return Math.round(pinMainLeft + pinMainWidth / 2) + ', ' + Math.round(pinMainTop + pinMainHeight);
};

var pasteAddress = function () {
  var inputAddress = document.querySelector('#address');
  inputAddress.value = getMainPinCoordinate();
};

pasteAddress();

mapPinMain.addEventListener('mousedown', getActivePage);
mapPinMain.addEventListener('mousedown', pasteAddress);
mapPinMain.addEventListener('keydown', getActivePage);

var inputRooms = document.querySelector('#room_number');
var inputGuests = document.querySelector('#capacity');
// console.log(inputRooms.value);

var validateGuests = function () {
  if (Number(inputRooms.value) === 1 && (Number(inputGuests.value) > 1 || Number(inputGuests.value) === 0)) {
    inputGuests.setCustomValidity('1 комната — «для 1 гостя»');
  } else if (Number(inputRooms.value) === 2 && (Number(inputGuests.value) > 2 || Number(inputGuests.value) === 0)) {
    inputGuests.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
  } else if (Number(inputRooms.value) === 3 && (Number(inputGuests.value) > 3 || Number(inputGuests.value) === 0)) {
    inputGuests.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
  } else if (Number(inputRooms.value) === 100 && Number(inputGuests.value) !== 0) {
    inputGuests.setCustomValidity('100 комнат — «не для гостей»');
  } else {
    inputGuests.setCustomValidity('');
  }
};

validateGuests();

inputRooms.addEventListener('change', validateGuests);
inputGuests.addEventListener('change', validateGuests);

var inputTitle = document.querySelector('#title');

var validateTitle = function () {
  if (inputTitle.validity.tooShort) {
    inputTitle.setCustomValidity('Описание должно быть не меннее ' + MIN_TITLE_LENGHT + ' симоволов');
  } else if (inputTitle.validity.tooLong) {
    inputTitle.setCustomValidity('Описание не должно привышать ' + MAX_TITLE_LENGHT + ' символов');
  } else {
    inputTitle.setCustomValidity('');
  }
};

inputTitle.addEventListener('input', validateTitle);

var inputType = document.querySelector('#type');
var inputPrice = document.querySelector('#price');
inputPrice.addEventListener('input', function () {
  if (inputPrice.value > MAX_PRICE) {
    inputPrice.setCustomValidity('Стоимость за ночь не может быть больше ' + MAX_PRICE);
  }
});

var validateType = function () {
  if (inputType === )
};
