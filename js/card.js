'use strict';

(function () {
  var TYPES_TRANSLATE = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
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
