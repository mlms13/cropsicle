var webshot = require('webshot');

module.exports.redirect = function (req, res) {
    res.redirect('/');
};

module.exports.load = function (req, res) {
    // TODO: validate that we're receiving an actual URL
    // before we try to take a screenshot

    // just playing around with the options
    var wsOptions = {
        screenSize: {
            width: 320,
            height: 'all'
        },
        shotSize: {
            width: 'window',
            height: 'all'
        }
    };

    webshot(req.params.url, wsOptions, function (err, stream) {
        // TODO: some error handling in here would also be a good thing
        // is it seriously this easy?
        stream.pipe(res);
    });
};