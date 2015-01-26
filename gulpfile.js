(function () {
    'use strict';

    var gulp = require('gulp');
    var annotate = require('gulp-ng-annotate');
    var concat = require('gulp-concat');
    var del = require('del');
    var flatten = require('gulp-flatten');
    var jshint = require('gulp-jshint');
    var less = require('gulp-less');
    var sourcemaps = require('gulp-sourcemaps');
    var uglify = require('gulp-uglify');
    var uglifycss = require('gulp-uglifycss');
    var util = require('gulp-util');
    var wiredep = require('wiredep');

    /*
     *  Group task(s) to output folder: www/css
     * */
    gulp.task('css-app', function () {
        return gulp.src('src/less/config.less')
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(uglifycss())
            .pipe(sourcemaps.write({sourceRoot: '/src/less'}))
            .pipe(gulp.dest('www/css/'));
    });

    gulp.task('css-vendor', function () {
        return gulp.src(wiredep().css)
            .pipe(gulp.dest('www/css/'));
    });

    gulp.task('css', ['css-app', 'css-vendor']);


    /*
     *  Group task(s) to output folder: www/fonts
     * */
    gulp.task('fonts', function () {
        return gulp.src([
            'bower_components/ionic/fonts/**/*.{ttf,woff,eot,svg}',
            'resources/fonts/**/*.{ttf,woff,eot,svg}'
        ])
            .pipe(flatten())
            .pipe(gulp.dest('www/fonts'));
    });


    /*
     *  Group task(s) to output folder: www/img
     * */
    gulp.task('img', function () {
        return gulp.src('resources/images/**/*')
            .pipe(flatten())
            .pipe(gulp.dest('www/img'));
    });


    /*
     *  Group task(s) to output folder: www/js
     * */
    gulp.task('js-app', function () {
        return gulp.src(['src/app/app.js', 'src/app/**/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(annotate())
            .pipe(uglify())
            .pipe(sourcemaps.write({sourceRoot: '/src/app'}))
            .pipe(gulp.dest('www/js/'));
    });

    gulp.task('js-templates', function () {
        var tpl = '(function () { \'use strict\'; ' +
            'angular.module(\'app.templates\', []).run(); })();';

        function stringSrc(filename, string) {
            var stream = require('stream');
            var src = stream.Readable({objectMode: true});
            var fileOptions = {path: filename, contents: new Buffer(string)};

            src._read = function () {
                var file = new util.File(fileOptions);
                this.push(file);
                this.push(null);
            };

            return src;
        }

        return stringSrc('templates.js', tpl)
            .pipe(gulp.dest('www/js/'));
    });

    gulp.task('js', ['js-app', 'js-templates']);


    /*
     *  Group task(s) to output folder: www/lib
     * */
    gulp.task('lib', function () {
        return gulp.src(wiredep().js)
            .pipe(gulp.dest('www/lib/'));
    });


    /*
     *  Group task(s) to output file: www/index.html
     * */
    gulp.task('index', function () {
        return gulp.src('www/index.html')
            .pipe(wiredep.stream({
                fileTypes: {
                    html: {
                        replace: {
                            css: function (filepath) {
                                return '<link rel="stylesheet" href="css/' +
                                    filepath.split('/').pop() + '"/>';
                            },
                            js: function (filepath) {
                                return '<script src="lib/' +
                                    filepath.split('/').pop() + '"></script>';
                            }
                        }
                    }
                }
            }))
            .pipe(gulp.dest('www/'));
    });


    gulp.task('templates', function () {
        return gulp.src('src/app/**/*.html')
            .pipe(gulp.dest('www/js/'));
    });

    gulp.task('build', ['css', 'fonts', 'img', 'js', 'lib', 'templates'],
        function () {
            gulp.start(['index']);
        });

    gulp.task('clean', function (cb) {
        del(['www/css', 'www/fonts', 'www/img', 'www/js', 'www/lib'], cb);
    });

    gulp.task('default', ['clean'], function () {
        gulp.start(['build']);
    });


    gulp.task('watch', function () {
        gulp.watch('src/less/**/*.less', ['css-app']);
        gulp.watch('src/app/**/*.js', ['js-app']);
        gulp.watch('src/app/**/*.html', ['templates']);
    });

})();
