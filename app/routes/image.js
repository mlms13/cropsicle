var webshot = require('webshot');

module.exports = function (req, res) {
    // TODO: validate that we're receiving an actual URL
    // before we try to take a screenshot

    webshot(req.params.url, function (err, stream) {
        // TODO: some error handling in here would also be a good thing
        // is it seriously this easy?
        stream.pipe(res);
    });
};