'use strict';

(function () {
  var FileImage = function (chooserFile, preview) {
    this.chooserFile = chooserFile;
    this.preview = preview;
    this.reader = null;
    this.image = null;
    this.defaultSrc = '';
  };

  FileImage.prototype.init = function () {
    var image = this.preview.querySelector('img');

    if (image) {
      this.image = image;
      this.defaultSrc = this.image.src;
    } else {
      var img = new Image();
      img.width = 70;
      img.height = 70;
      this.preview.appendChild(img);
      this.image = img;
    }

    this.chooserFile.disabled = false;

    this.chooserFile.addEventListener('change', this.chooserHandler.bind(this));
  };

  FileImage.prototype.chooserHandler = function () {
    var file = this.chooserFile.files[0];

    this.reader = new FileReader();
    this.reader.addEventListener('load', this.readerHandler.bind(this));
    this.reader.readAsDataURL(file);
  };

  FileImage.prototype.readerHandler = function () {
    this.image.src = this.reader.result;
  };

  FileImage.prototype.remove = function () {
    if (this.defaultSrc) {
      this.image.src = this.defaultSrc;
    } else {
      this.preview.removeChild(this.image);
      this.image = null;
    }
    this.chooserFile.value = null;
    this.reader = null;

    this.chooserFile.removeEventListener('change', this.chooserHandler.bind(this));
  };

  window.image = {
    FileImage: FileImage
  };
}());
