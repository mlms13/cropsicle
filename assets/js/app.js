(function () {
    "use strict";

    var submitForm,
        loadImg;

    loadImg = function (e) {
        var cropped = new ImageCrop({
            image: e.target
        });
    };

    submitForm = function (e) {
        var url = e.target.querySelector('.start-input').value,
            placeholder = document.getElementById('img-placeholder'),
            img = new Image();

        // prevent the form from submitting
        e.preventDefault();

        // TODO: show a loading animation
        placeholder.style.width = '1024px';
        placeholder.className = 'loading';
        placeholder.appendChild(img);
        img.src = '/image/1024/all/' + encodeURIComponent(url);

        img.addEventListener('load', loadImg);

        // return false, just in case
        return false;
    };

    document.querySelector('form').addEventListener('submit', submitForm);
}());
