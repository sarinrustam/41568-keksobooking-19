'use strict';

(function () {
  var PIN_CLIENT_WIDTH = 25;
  var PIN_CLIENT_HEIGHT = 70;

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

  var render = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < ads.length; j++) {
      fragment.appendChild(renderPinElement(ads[j]));
    }

    mapPinsList.appendChild(fragment);
  };

  window.pin = {
    render: render
  };
})();
