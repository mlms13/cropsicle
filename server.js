// import the party
var express = require('express'),
    app = express(),
    path = require('path');

// set up middleware for all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());

// add static routes before we use router for public files
app.use(express.static(path.join(__dirname, 'public')));

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('The NODE_ENV is ' + app.get('env'));

// in our development environment, inject the livereload script into non-static files
app.configure('development', function () {
    app.use(require('connect-livereload')());
});

app.use(app.router);

// routes
app.get('/', require('./app/routes/index'));
app.get('/image/:url', require('./app/routes/image'));

// start that server
app.listen(app.get('port'));