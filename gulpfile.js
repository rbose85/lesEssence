(function () {
    'use strict';

    var annotate = require('gulp-ng-annotate');
    var autoprefixer = require('gulp-autoprefixer');
    var bower = require('main-bower-files');
    var concat = require('gulp-concat');
    var del = require('del');
    var glob = require('glob');
    var gulp = require('gulp');
    var inject = require('gulp-inject');
    var merge = require('merge-stream');
    var minifyCSS = require('gulp-minify-css');
    var minifyHTML = require('gulp-minify-html');
    var minifyJS = require('gulp-uglify');
    var path = require('path');
    var rename = require('gulp-rename');
    var sass = require('gulp-sass');
    var sequence = require('run-sequence');
    var sort = require('gulp-angular-filesort');
    var sourcemaps = require('gulp-sourcemaps');
    var template = require('gulp-angular-templatecache');
    var util = require('gulp-util');


    /*********************************************************
     `BUILD_TYPE` can be either, 'development' or 'production'
     **********************************************************/
    var BUILD_TYPE = (function developmentOrProduction() {
        var buildType;

        // low weighted option `$ gulp --type production <task>`
        if (util.env.type) {
            buildType = util.env.type;
        }

        // high weighted option `$ NODE_ENV=development gulp <task>`
        if (process.env.NODE_ENV) {
            buildType = process.env.NODE_ENV;
        }

        // default value is set to 'development'
        buildType = buildType || 'development';

        // ensure only specific choices are provided for build type
        if (buildType !== 'development' && buildType !== 'production') {
            util.log(util.colors.yellow('WARNING!' +
                ' Invalid build option provided -' +
                ' Deferring to a "development" build.'));
        }

        // set all sources to a specific choice
        util.env.type = process.env.NODE_ENV = buildType;

        return buildType;
    })();


    /****************************
     * U T I L I T Y  T A S K S *
     ****************************/

    gulp.task('bower-scss', function () {
        util.log(bower('**/*.scss'));
        return gulp.src(bower('**/*.scss'), {base: 'bower_components/'})
            .pipe(rename(function (path) {
                path.dirname = path.dirname.replace('/scss', '');
            }))
            .pipe(gulp.dest('src/.cache/scss/'));
    });

    gulp.task('bower-lib', function () {
        return gulp.src(bower({filter: '**/*.js', env: 'development'}))
            .pipe(gulp.dest('src/.cache/lib/'));
    });


    /***************************************
     * G E N E R A L  B U I L D  T A S K S *
     ***************************************/

    gulp.task('css', function () {
        var getTask = function createSASSCompilationTask(filename) {
            return gulp.src(filename)
                .pipe(sourcemaps.init())
                .pipe(sass({errLogToConsole: true}))
                .pipe(autoprefixer({browsers: ['last 2 version', '> 5%']}))
                .pipe(BUILD_TYPE === 'production' ? minifyCSS() : util.noop())
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('www/css/'));
        };

        var tasks = glob.sync('src/scss/*.scss')
            .map(function (file) {
                return getTask(file);
            });

        return merge(tasks);
    });

    gulp.task('fonts', function () {
        return gulp.src(bower('**/*.{eot,svg,ttf,woff,woff2}'))
            .pipe(gulp.dest('www/fonts/'));
    });

    gulp.task('img', function () {
        return gulp.src('src/img/*.svg')
            .pipe(gulp.dest('www/img/'));
    });

    gulp.task('lib', function () {
        return gulp.src(bower({filter: '**/*.js', env: BUILD_TYPE}))
            .pipe(gulp.dest('www/lib/'));
    });


    gulp.task('app-js', function () {
        return (BUILD_TYPE === 'production') ?
            gulp.src(['src/app/**/*.js', '!src/app/**/*.spec.js']).pipe(sort())
                .pipe(concat('app.min.js'))
                .pipe(annotate())
                .pipe(sourcemaps.init())
                .pipe(minifyJS())
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('www/app/')) :
            gulp.src(['src/app/**/*.js', '!src/app/**/*.spec.js'])
                .pipe(gulp.dest('www/app/'));
    });

    gulp.task('app-tpl', function () {
        return gulp.src('src/app/**/*.html')
            .pipe(minifyHTML())
            .pipe(template({
                module: 'app.templates',
                standalone: true,
                base: path.join(__dirname, 'src/app/states/'),
                moduleSystem: 'IIFE'
            }))
            .pipe(gulp.dest('www/app/'));
    });

    gulp.task('app', ['app-js', 'app-tpl']);


    gulp.task('index-css', function () {
        var source = gulp.src('www/css/*.css', {read: false});
        var options = {
            addRootSlash: false,
            ignorePath: 'www'
        };

        return gulp.src('www/index.html')
            .pipe(inject(source, options))
            .pipe(gulp.dest('www/'));
    });

    gulp.task('index-lib', function () {
        var source = gulp.src(bower('**/*.js').map(function (val) {
            return path.join('www', 'lib', val.split('/').splice(-1, 1).pop());
        }));
        var options = {
            addRootSlash: false,
            ignorePath: 'www',
            name: 'inject:lib'
        };

        return gulp.src('www/index.html')
            .pipe(inject(source, options))
            .pipe(gulp.dest('www/'));
    });

    gulp.task('index-app', function () {
        var source = gulp.src('www/app/**/*.js').pipe(sort());
        var options = {
            addRootSlash: false,
            ignorePath: 'www',
            name: 'inject:app'
        };

        return gulp.src('www/index.html')
            .pipe(inject(source, options))
            .pipe(gulp.dest('www/'));
    });

    gulp.task('index', function (done) {
        gulp.src('src/index.html')
            .pipe(gulp.dest('www/'))
            .on('end', function () {
                sequence('index-css', 'index-lib', 'index-app', done);
            });
    });


    gulp.task('build', ['app', 'css', 'fonts', 'img', 'lib'], function () {
        gulp.start(['index']);
    });

    gulp.task('clean', function (done) {
        del(['www'], done);
    });

    gulp.task('default', ['clean'], function () {
        gulp.start(['build']);
    });


    gulp.task('watch', function () {
        gulp.watch('src/scss/**/*.scss', ['css']);

        gulp.watch(['src/app/**/*.js', '!src/app/**/*.spec.js'],
            function (event) {
                if (event.type === 'deleted') {
                    del.sync(event.path.replace('/src/', '/www/'));
                } else {
                    gulp.start(['app-js']);
                }
            });

        gulp.watch('src/app/**/*.html', ['app-tpl']);
    });

})();
