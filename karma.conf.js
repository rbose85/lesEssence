'use strict';

module.exports = function (config) {
    config.set({
        // frameworks list: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // compile the template cache
        preprocessors: {
            'src/**/*.html': 'html2js'
        },

        // https://github.com/karma-runner/karma-ng-html2js-preprocessor
        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/',
            prependPrefix: 'js/',
            moduleName: 'app.templates'
        },

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // list of files / patterns to load in the browser
        files: [
            'www/lib/angular.js',
            'www/lib/ionic.js',
            'www/lib/**/*.js',

            'bower_components/angular-mocks/angular-mocks.js',

            'src/**/*.module.js',
            'src/**/*.{js,html}',

            'src/**/*.spec.js'
        ],

        // reporters list: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        // watch files, and executing tests whenever any file changes
        autoWatch: true,

        // browser list: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome', 'Firefox', 'Safari', 'ChromeCanary', 'PhantomJS'],

        // CI mode - if true, Karma captures browsers, runs tests, and exits
        singleRun: false
    });
};
