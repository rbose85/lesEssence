(function () {
    'use strict';

    angular.module('app')
        .constant('VERSION', '0.1')
        .constant('FBURL', 'https://lesessence.firebaseio.com')
        .run(Initialisation);

    /* @ngInject */
    function Initialisation($rootScope, $ionicPlatform, keyboard) {

        var initKeyboard = function () {
            keyboard.disableScroll();
            keyboard.hideAccessoryBar();
        };

        var initStatusBar = function () {
            ionic.Platform.showStatusBar(true);
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
