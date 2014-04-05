(function () {
    "use strict";

    var submitForm,
        loadImg;

    loadImg = function (e) {
        console.log(e.target);

        var cropped = new ImageCrop({
            image: e.target
        });

        cropped.init();
    };

    submitForm = function (e) {
        var url = e.target.querySelector('.start-input').value,
            img = new Image();

        // prevent the form from submitting
        e.preventDefault();

        // TODO: don't append the image to a stupid place
        document.body.appendChild(img);
        img.src = '/image/1024/all/' + encodeURIComponent(url);

        // TODO: show a spinner until the image has loaded
        img.addEventListener('load', loadImg);

        // return false, just in case
        return false;
    };

    document.querySelector('form').addEventListener('submit', submitForm);
}());
