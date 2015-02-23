(function () {
    'use strict';

    angular.module('app.cordova')
        .factory('keyboard', KeyboardService);

    /* @ngInject */
    function KeyboardService($window, $cordovaKeyboard) {
        var isKeyboard = function () {
            return !!($window.cordova && $window.cordova.plugins.Keyboard);
        };

        var setDisableScroll = function (value) {
            return isKeyboard() && $cordovaKeyboard.disableScroll(!!value);
        };

        var setHideKeyboardAccessoryBar = function (value) {
            return isKeyboard() && $cordovaKeyboard.hideAccessoryBar(!!value);
        };

        var dismissKeyboard = function () {
            return isKeyboard() && $cordovaKeyboard.close();
        };

        return {
            enableScroll: function () {
                setDisableScroll(false);
            },
            disableScroll: function () {
                setDisableScroll(true);
            },
            showAccessoryBar: function () {
                setHideKeyboardAccessoryBar(false);
            },
            hideAccessoryBar: function () {
                setHideKeyboardAccessoryBar(true);
            },
            hide: function () {
                dismissKeyboard();
            }
        };
    }

})();
