'use strict';

(function () {
  window.map.init();
  window.message.init(window.message.TYPES.SUCCESS);
  window.message.init(window.message.TYPES.ERROR);
  window.form.toggleFieldsAvailability(true);
})();
