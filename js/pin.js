'use strict';

(function () {
  var PIN_CLIENT_WIDTH = 25;
  var PIN_CLIENT_HEIGHT = 70;
  var ADS_COUNT = 5;

  var mapPinsList = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPinElement = function (element) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = element.location.x + PIN_CLIENT_WIDTH + 'px';
    pinElement.style.top = element.location.y - PIN_CLIENT_HEIGHT + 'px';

    var pinElementImage = pinElement.querySelector('img');
    pinElementImage.src = element.author.avatar;
    pinElementImage.alt = element.offer.title;

    var popupOpenHandler = function () {
      var mapFilterContainer = document.querySelector('.map__filters-container');
      mapFilterContainer.before(window.card.render(element));
    };

    pinElement.addEventListener('click', popupOpenHandler);
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === window.util.BUTTONS.ENT) {
        popupOpenHandler();
      }
    });
    return pinElement;
  };

  var removeAll = function () {
    var pins = [].slice.call(mapPinsList.querySelectorAll('.map__pin'));
    pins.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        mapPinsList.removeChild(item);
      }
    });
  };

  var render = function (ads) {
    var count = ads.length >= ADS_COUNT ? ADS_COUNT : ads.length;
    var fragment = document.createDocumentFragment();
    removeAll();

    for (var j = 0; j < count; j++) {
      fragment.appendChild(renderPinElement(ads[j]));
    }

    mapPinsList.appendChild(fragment);
  };

  window.pin = {
    render: render,
    remove: removeAll
  };
})();
