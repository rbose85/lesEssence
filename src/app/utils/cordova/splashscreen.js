(function () {
    'use strict';

    angular.module('app.cordova')
        .factory('splashscreen', SplashScreenService);

    /* @ngInject */
    function SplashScreenService($timeout, $window, $cordovaSplashscreen) {
        var toggleSplashScreen = function (state) {
            if ($window.navigator && $window.navigator.splashscreen) {
                return $timeout(function () {
                    $cordovaSplashscreen[state]();
                }, 0);
            }
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
