(function () {
    'use strict';

    angular.module('app.cordova')
        .factory('statusbar', StatusBarService);

    /* @ngInject */
    function StatusBarService($window) {

        var getStatusBar = function () {
            return $window.StatusBar;
        };

        var setLightContent = function () {
            var statusBar = getStatusBar();
            return statusBar && statusBar.styleLightContent();
        };

        var setDarkContent = function () {
            var statusBar = getStatusBar();
            return statusBar && statusBar.styleDefault();
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
