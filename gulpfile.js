var gulp = require('gulp'),
    gutil = require('gulp-util');

// compile stylesheets
gulp.task('stylus', function () {
    var stylus = require('gulp-stylus'),
        autoprefixer = require('gulp-autoprefixer'),
        minify = require('gulp-minify-css');

    return gulp.src('./assets/styl/main.styl')
        .pipe(stylus({ paths: ['./styl/*.styl'] }))
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(gulp.dest('./public/css'));
});

// minify javascript
gulp.task('js', function () {
    var uglify = require('gulp-uglify');

    return gulp.src('./assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

// run scripts through jshint
gulp.task('lint', function () {
    var jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish');

    return gulp.src(['./assets/js/custom.js', 'server.js', 'app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// minify images
gulp.task('images', function () {
    var imagemin = require('gulp-imagemin');

    return gulp.src('assets/images/**/*')
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('./public/images'));
});

// start the server and restart when changes happen
gulp.task('server', function () {
    var nodemon = require('nodemon');

    nodemon({
        'script': 'server.js',
        'ignore': ['.git', 'public/**', 'assets/**']
    }).on('start', function () {
        gutil.log('Nodemon has started the server');
    });
});

// watch files for changes and livereload the browser
gulp.task('watch', function () {
    var lr = require('gulp-livereload'),
        server = lr();

    gulp.watch('assets/styl/**', ['stylus']);
    gulp.watch('assets/js/**', ['lint', 'js']);
    gulp.watch('assets/images/**', ['images'])
    gulp.watch('public/**').on('change', function (file) {
        server.changed(file.path);
    });
});

// run all of the compilation-related tasks
gulp.task('compile', ['stylus', 'js', 'lint', 'images']);

// by default, compile everything, watch for changes, and start the server
gulp.task('default', ['compile', 'watch', 'server'], function () {
    var open = require('open');
    open('http://localhost:3000');
});
