'use strict';

(function () {
  var TypesTranslate = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderTitle = function (element, card) {
    var cardElementTitle = element.querySelector('.popup__title');
    cardElementTitle.textContent = card.offer.title;
  };

  var renderAddress = function (element, card) {
    var cardElementAdress = element.querySelector('.popup__text--address');
    if (card.offer.address) {
      cardElementAdress.textContent = card.offer.address;
    } else {
      cardElementAdress.classList.add('hidden');
    }
  };

  var renderPrice = function (element, card) {
    var cardElementPrice = element.querySelector('.popup__text--price');
    if (card.offer.price) {
      cardElementPrice.textContent = card.offer.price + ' ₽/ночь';
    } else {
      cardElementPrice.classList.add('hidden');
    }
  };

  var renderType = function (element, card) {
    var cardElementType = element.querySelector('.popup__type');
    if (card.offer.type) {
      cardElementType.textContent = TypesTranslate[card.offer.type];
    } else {
      cardElementType.classList.add('hidden');
    }
  };

  var renderCapacity = function (element, card) {
    var cardElementCapacity = element.querySelector('.popup__text--capacity');
    if (card.offer.rooms && card.offer.guests) {
      cardElementCapacity.textContent = card.offer.rooms + ' комнаты' + ' для ' + card.offer.guests + ' гостей';
    } else {
      cardElementCapacity.classList.add('hidden');
    }
  };

  var renderTime = function (element, card) {
    var cardElementTime = element.querySelector('.popup__text--time');
    if (card.offer.checkin && card.offer.checkout) {
      cardElementTime.textContent = 'Заезд после ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;
    } else {
      cardElementTime.classList.add('hidden');
    }
  };

  var renderFeatures = function (element, card) {
    var cardElementFeatures = element.querySelector('.popup__features');
    if (card.offer.features.length) {
      cardElementFeatures.textContent = card.offer.features;
    } else {
      cardElementFeatures.classList.add('hidden');
    }
  };

  var renderDescription = function (element, card) {
    var cardElementDescription = element.querySelector('.popup__description');
    if (card.offer.description) {
      cardElementDescription.textContent = card.offer.description;
    } else {
      cardElementDescription.classList.add('hidden');
    }
  };

  var renderPhotos = function (element, card) {
    var cardElementPhotos = element.querySelector('.popup__photos');
    if (card.offer.photos.length) {
      var photoTemplate = element.querySelector('.popup__photo');
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
  };

  var renderAvatar = function (element, card) {
    var cardElementAvatar = element.querySelector('.popup__avatar');
    cardElementAvatar.src = card.author.avatar;
  };

  var remove = function () {
    var element = document.querySelector('.map__card');

    if (element) {
      element.parentNode.removeChild(element);
    }
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    renderTitle(cardElement, card);
    renderAddress(cardElement, card);
    renderPrice(cardElement, card);
    renderType(cardElement, card);
    renderCapacity(cardElement, card);
    renderTime(cardElement, card);
    renderFeatures(cardElement, card);
    renderDescription(cardElement, card);
    renderPhotos(cardElement, card);
    renderAvatar(cardElement, card);

    var cardPopupClose = cardElement.querySelector('.popup__close');

    var closePopupHandler = function () {
      cardElement.parentNode.removeChild(cardElement);
    };

    cardPopupClose.addEventListener('click', closePopupHandler);
    cardPopupClose.addEventListener('keydown', function (evt) {
      if (evt.key === window.util.BUTTONS.ESC) {
        closePopupHandler();
      }
    });

    var currentMapCard = document.querySelector('.map__card');

    if (currentMapCard) {
      currentMapCard.parentNode.removeChild(currentMapCard);
    }

    return cardElement;
  };

  window.card = {
    render: renderCard,
    remove: remove
  };
})();
