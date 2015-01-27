(function () {
    'use strict';

    angular.module('app', [
        'firebase',
        'ionic',
        'ngCordova',

        'app.common',
        'app.cordova',
        'app.foyer',
        'app.loading'
    ])
        .constant('VERSION', '0.1')
        .constant('FBURL', 'https://lesessence.firebaseio.com/')
        .config(AppRouter)
        .run(Initialisation);

    /* @ngInject */
    function AppRouter($urlRouterProvider) {
        $urlRouterProvider.otherwise('/load');
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
            console.error('State Error', angular.toJson(error, true));
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
