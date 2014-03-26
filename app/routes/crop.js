
module.exports.handlePost = function (req, res) {
    // since the form should be handled with client-side Javascript,
    // if they POST to this route, we can assume Javascript is off...

    res.render('crop', {
        url: req.body.url
    });
};

module.exports.handleGetUrl = function (req, res) {
    // this route exists so that people can bookmark the link or
    // share a URL and come back to it later.
};