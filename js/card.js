'use strict';

(function () {
  var TypesTranslate = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderTitle = function (cardElement, card) {
    var cardElementTitle = cardElement.querySelector('.popup__title');
    cardElementTitle.textContent = card.offer.title;
  };

  var renderAddress = function (cardElement, card) {
    var cardElementAdress = cardElement.querySelector('.popup__text--address');
    if (card.offer.address) {
      cardElementAdress.textContent = card.offer.address;
    } else {
      cardElementAdress.classList.add('hidden');
    }
  };

  var renderPrice = function (cardElement, card) {
    var cardElementPrice = cardElement.querySelector('.popup__text--price');
    if (card.offer.price) {
      cardElementPrice.textContent = card.offer.price + ' ₽/ночь';
    } else {
      cardElementPrice.classList.add('hidden');
    }
  };

  var renderType = function (cardElement, card) {
    var cardElementType = cardElement.querySelector('.popup__type');
    if (card.offer.type) {
      cardElementType.textContent = TypesTranslate[card.offer.type];
    } else {
      cardElementType.classList.add('hidden');
    }
  };

  var renderCapacity = function (cardElement, card) {
    var cardElementCapacity = cardElement.querySelector('.popup__text--capacity');
    if (card.offer.rooms && card.offer.guests) {
      cardElementCapacity.textContent = card.offer.rooms + ' комнаты' + ' для ' + card.offer.guests + ' гостей';
    } else {
      cardElementCapacity.classList.add('hidden');
    }
  };

  var renderTime = function (cardElement, card) {
    var cardElementTime = cardElement.querySelector('.popup__text--time');
    if (card.offer.checkin && card.offer.checkout) {
      cardElementTime.textContent = 'Заезд после ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;
    } else {
      cardElementTime.classList.add('hidden');
    }
  };

  var renderFeatures = function (cardElement, card) {
    var cardElementFeatures = cardElement.querySelector('.popup__features');
    if (card.offer.features.length) {
      cardElementFeatures.textContent = card.offer.features;
    } else {
      cardElementFeatures.classList.add('hidden');
    }
  };

  var renderDescription = function (cardElement, card) {
    var cardElementDescription = cardElement.querySelector('.popup__description');
    if (card.offer.description) {
      cardElementDescription.textContent = card.offer.description;
    } else {
      cardElementDescription.classList.add('hidden');
    }
  };

  var renderPhotos = function (cardElement, card) {
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
  };

  var renderAvatar = function (cardElement, card) {
    var cardElementAvatar = cardElement.querySelector('.popup__avatar');
    cardElementAvatar.src = card.author.avatar;
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
    render: renderCard
  };
})();
