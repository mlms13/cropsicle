document.querySelector('form').addEventListener('submit', function (e) {
    "use strict";
    var url = e.target.querySelector('.start-input').value,
        img = new Image();

    // prevent the form from submitting
    e.preventDefault();

    img.src = '/image/1024/all/' + encodeURIComponent(url);

    // TODO: show a spinner until the image has loaded
    // TODO: insert this somewhere else in the document
    document.body.appendChild(img);
    return false;
});