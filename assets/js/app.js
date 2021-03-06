(function () {
    "use strict";

    var submitForm,
        loadImg,
        handleImgIn,
        handleImgOut,
        handleImgDrop,
        placeholder = document.getElementById('img-placeholder');

    loadImg = function (e) {
        var cropped,
            widthBox = document.getElementById('crop-width'),
            heightBox = document.getElementById('crop-height'),
            ratioBox = document.getElementById('crop-ratio');

        // update the img container after img loads
        placeholder.className = '';
        placeholder.style.width = e.target.width + 'px';

        // run our crop plugin
        cropped = new ImageCrop({
            image: e.target,
            imageType: 'image/jpeg',
            imageQuality: 0.7
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
            img = new Image();

        // prevent the form from submitting
        e.preventDefault();

        // TODO: show a loading animation
        placeholder.className = 'loading';
        placeholder.textContent = '';
        placeholder.appendChild(img);

        img.addEventListener('load', loadImg);
        img.src = '/image/1024/all/' + encodeURIComponent(url);

        // return false, just in case
        return false;
    };

    handleImgIn = function (e) {
        e.preventDefault();
        e.stopPropagation();

        placeholder.classList.add('over');
    };

    handleImgOut = function (e) {
        placeholder.classList.remove('over');
    };

    handleImgDrop = function (e) {
        var file,
            reader = new FileReader();

        e.stopPropagation();
        e.preventDefault();

        // set up an event handler for our file reading
        reader.onload = function () {
            var data = reader.result,
                img = new Image();

            img.addEventListener('load', loadImg);
            img.src = data;
            placeholder.textContent = '';
            placeholder.appendChild(img);
        };

        // TODO: warn the user if they dropped multiple files at once
        // or even better... handle it
        if (e.dataTransfer.files.length > 1) {
            // ... do something here
        }

        // grab the first file in the array and dump it into the cropper
        file = e.dataTransfer.files[0];

        // and only continue if we're dealing with an image
        if (file.type.match('image.*')) {
            reader.readAsDataURL(file);
        }
    };

    // set up Drag and Drop if the browser supports file manipulation
    if (window.File && window.FileReader && window.FileList) {
        // style the placeholder correctly
        placeholder.classList.add('droppable');
        placeholder.textContent = "...or drop an image here"

        placeholder.addEventListener('dragover', handleImgIn);
        placeholder.addEventListener('dragleave', handleImgOut);
        placeholder.addEventListener('drop', handleImgDrop);
    }
    document.querySelector('form').addEventListener('submit', submitForm);
}());
