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
        'app.tabs.home',
        'app.tabs.logbook',
        'app.tabs.refuel',
        'app.tabs.settings',

        'app.templates'
    ]);

})();
