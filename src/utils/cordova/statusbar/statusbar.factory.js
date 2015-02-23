(function () {
    'use strict';

    angular.module('app.cordova')
        .factory('statusbar', StatusBarService);

    /* @ngInject */
    function StatusBarService($window, $cordovaStatusbar) {
        var isStatusBar = function () {
            return !!$window.StatusBar;
        };

        var setLightContent = function () {
            // Default:0, LightContent:1, BlackTranslucent:2, BlackOpaque:3
            return isStatusBar() && $cordovaStatusbar.style(1);
        };

        var setDarkContent = function () {
            // Default:0, LightContent:1, BlackTranslucent:2, BlackOpaque:3
            return isStatusBar() && $cordovaStatusbar.style(0);
        };

        return {
            light: function () {
                setLightContent();
            },
            dark: function () {
                setDarkContent();
            }
        };
    }

})();
