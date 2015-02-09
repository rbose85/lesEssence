(function () {
    'use strict';

    angular.module('app.cordova')
        .factory('keyboard', KeyboardService);

    /* @ngInject */
    function KeyboardService($window) {

        var getKeyboard = function () {
            if ($window.cordova) {
                return $window.cordova.plugins.Keyboard;
            }
        };

        var setDisableScroll = function (value) {
            var keyboard = getKeyboard();
            return keyboard && keyboard.disableScroll(!!(value));
        };

        var setHideKeyboardAccessoryBar = function (value) {
            var keyboard = getKeyboard();
            return keyboard && keyboard.hideKeyboardAccessoryBar(!!(value));
        };

        var dismissKeyboard = function (value) {
            var keyboard = getKeyboard();
            return (keyboard && value) ? keyboard.close() : keyboard.show();
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
            show: function () {
                dismissKeyboard(false);
            },
            hide: function () {
                dismissKeyboard(true);
            }
        };
    }

})();
