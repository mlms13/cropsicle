function cleanUrl(url) {
    url = url.replace('http://', '').replace('https://', '');
    return encodeURIComponent(url);
}

module.exports.submitUrl = function (req, res) {
    // since the form should be handled with client-side Javascript,
    // if they POST to this route, we can assume Javascript is off...
    var width = req.body.width || 1024,
        height = req.body.height || 'all';

    if (req.body.url) {
        res.redirect('/crop/' + width + '/' + height + '/' + cleanUrl(req.body.url));
    } else {
        // TODO: show them a message telling them they need to enter a better URL
        res.redirect('/');
    }
};

module.exports.handleGetUrl = function (req, res) {
    // this route exists so that people can bookmark the link or
    // share a URL and come back to it later.

    res.render('crop', {
        width: req.params.width,
        height: req.params.height,
        url: cleanUrl(req.params.url)
    });
};
