(function () {
    'use strict';

    angular.module('app.cordova')
        .factory('splashscreen', SplashScreenService);

    /* @ngInject */
    function SplashScreenService($timeout, $window, $cordovaSplashscreen) {
        var isSplashScreen = function () {
            return !!($window.navigator && $window.navigator.splashscreen);
        };

        var toggleSplashScreen = function (state) {
            return isSplashScreen() && $timeout(function () {
                    $cordovaSplashscreen[state]();
                }, 0);
        };

        return {
            show: function showSplashScreen() {
                toggleSplashScreen('show');
            },
            hide: function hideSplashScreen() {
                toggleSplashScreen('hide');
            }
        };
    }

})();
