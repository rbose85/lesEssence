(function () {
    'use strict';

    angular.module('app.cordova')
        .factory('statusbar', StatusBarService);

    /* @ngInject */
    function StatusBarService($timeout, $window, $cordovaStatusbar) {
        var isStatusBar = function () {
            return !!$window.StatusBar;
        };

        var setContent = function (style) {
            var value;
            switch (style) {
                case 'LightContent':
                    value = 1;
                    break;
                case 'BlackTranslucent':
                    value = 2;
                    break;
                case 'BlackOpaque':
                    value = 3;
                    break;
                case 'DarkContent':
                    value = 0;
                    break;
                default:
                    value = 0;
            }

            return isStatusBar() && $timeout(function () {
                    $cordovaStatusbar.style(value);
                }, 0);
        };

        var toggleStatusBar = function (state) {
            return isStatusBar() && $timeout(function () {
                    $cordovaStatusbar[state]();
                }, 0);
        };

        return {
            light: function () {
                setContent('LightContent');
            },
            dark: function () {
                setContent('DarkContent');
            },
            show: function () {
                toggleStatusBar('show');
            },
            hide: function () {
                toggleStatusBar('hide');
            }
        };
    }

})();
