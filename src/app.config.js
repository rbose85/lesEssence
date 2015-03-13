(function () {
    'use strict';

    angular.module('app')
        .constant('VERSION', '0.1')
        .constant('FBURL', 'https://lesessence.firebaseio.com')
        .run(InitKeyboard)
        .run(InitStatusbar)
        .run(InitUiRouter);

    /* @ngInject */
    function InitKeyboard($ionicPlatform, keyboard) {
        var initKeyboard = function () {
            keyboard.disableScroll();
            keyboard.hideAccessoryBar();
        };

        $ionicPlatform.ready(function () {
            initKeyboard();
        });
    }

    /* @ngInject */
    function InitStatusbar($ionicPlatform, statusbar) {
        var initStatusBar = function () {
            statusbar.show();
        };

        $ionicPlatform.ready(function () {
            initStatusBar();
        });
    }

    /* @ngInject */
    function InitUiRouter($ionicPlatform, $rootScope, $state, $stateParams) {
        var err = function (event, to, toParams, from, fromParams, error) {
            console.error(angular.toJson(error.message || error, true));
        };

        var unknown = function (event, unfoundState) {
            console.error('State Unknown', angular.toJson(unfoundState, true));
        };

        var initUiRouter = function () {
            $rootScope.$on('$stateChangeError', err);
            $rootScope.$on('$stateNotFound', unknown);

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        };

        $ionicPlatform.ready(function () {
            initUiRouter();
        });
    }

})();
