(function () {
    "use strict";

    var submitForm,
        loadImg;

    loadImg = function (e) {
        var widthBox = document.getElementById('crop-width'),
            heightBox = document.getElementById('crop-height'),
            ratioBox = document.getElementById('crop-ratio');

        var cropped = new ImageCrop({
            image: e.target
        });

        // set up event listeners for the crop tools
        widthBox.addEventListener('keyup', function () {
            ratioBox.value = widthBox.value / heightBox.value;
            cropped.set('outputWidth', parseFloat(widthBox.value));
            cropped.set('ratio', parseFloat(ratioBox.value));
        });

        heightBox.addEventListener('keyup', function () {
            ratioBox.value = widthBox.value / heightBox.value;
            cropped.set('outputHeight', parseFloat(heightBox.value));
            cropped.set('ratio', parseFloat(ratioBox.value));
        });

        ratioBox.addEventListener('keyup', function () {
            cropped.set('ratio', parseFloat(ratioBox.value));
        });

        document.getElementById('crop-it').addEventListener('click', function (e) {
            e.preventDefault();
            window.open(cropped.save());
        });

        // and fade them in
        document.querySelector('.crop-tools').style.opacity = 1;
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
