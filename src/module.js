(function () {
    'use strict';

    angular.module('app', [
        'firebase',
        'ionic',
        'ngCordova',

        'app.common',
        'app.cordova',
        'app.firebase',
        'app.foyer',
        'app.loading',

        'app.tabs',
        'app.tabs.history',
        'app.tabs.home',
        'app.tabs.settings',
        'app.tabs.statistics',

        'app.templates'
    ]);

})();
