var webshot = require('webshot');

module.exports.redirect = function (req, res) {
    res.redirect('/');
};

module.exports.loadImage = function (req, res) {
    // TODO: validate that we're receiving valid parameters
    // before we try to take a screenshot

    // just playing around with the options
    var wsOptions = {
        screenSize: {
            width: req.params.width,
            height: 768
        },
        shotSize: {
            height: req.params.height
        }
    };

    webshot(req.params.url, wsOptions, function (err, stream) {
        // TODO: some error handling in here would also be a good thing
        // is it seriously this easy?
        stream.pipe(res);
    });
};