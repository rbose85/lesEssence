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
    ])
        .constant('VERSION', '0.1')
        .constant('FBURL', 'https://lesessence.firebaseio.com')
        .config(AppRouter)
        .run(Initialisation);

    /* @ngInject */
    function AppRouter($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }

    /* @ngInject */
    function Initialisation($rootScope, $ionicPlatform, keyboard, statusbar) {

        var initKeyboard = function () {
            keyboard.disableScroll();
            keyboard.hideAccessoryBar();
        };

        var initStatusBar = function () {
            statusbar.dark();
        };

        var err = function (event, to, toParams, from, fromParams, error) {
            console.error(angular.toJson(error, true));
        };

        var unknown = function (event, unfoundState) {
            console.error('State Unknown', angular.toJson(unfoundState, true));
        };

        $ionicPlatform.ready(function () {
            initKeyboard();
            initStatusBar();

            $rootScope.$on('$stateChangeError', err);
            $rootScope.$on('$stateNotFound', unknown);
        });
    }

})();
