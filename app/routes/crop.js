function cleanUrl(url) {
    url = url.replace('http://', '').replace('https://', '');
    return encodeURIComponent(url);
}

module.exports.submitUrl = function (req, res) {
    // since the form should be handled with client-side Javascript,
    // if they POST to this route, we can assume Javascript is off...

    if (req.body.url) {
        res.redirect('/crop/' + cleanUrl(req.body.url));
    } else {
        // TODO: show them a message telling them they need to enter a better URL
        res.redirect('/');
    }
};

module.exports.handleGetUrl = function (req, res) {
    // this route exists so that people can bookmark the link or
    // share a URL and come back to it later.

    res.render('crop', { url: cleanUrl(req.params.url)});
};
