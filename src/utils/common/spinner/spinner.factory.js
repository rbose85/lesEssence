(function () {
    'use strict';

    angular.module('app.common')
        .factory('spinner', SpinnerService);

    /* @ngInject */
    function SpinnerService($ionicLoading, $timeout) {
        var spinnerIcon = '<i class="fa fa-spin icon ion-load-c fa-2x"></i> ';

        var show = function (message) {
            message = message || spinnerIcon;
            $ionicLoading.show({
                template: message,
                hideOnStateChange: true
            });
        };

        var loading = function () {
            show(spinnerIcon + 'Loading ...');
        };

        var error = function (message) {
            show(message || 'Something has gone wrong :(');

            $timeout(function () {
                hide();
            }, 1000);
        };

        var hide = function () {
            $ionicLoading.hide();
        };

        var timeout = function (message) {
            show(message);

            $timeout(function () {
                hide();
            }, 1000);
        };

        return {
            loading: loading,
            error: error,
            show: show,
            hide: hide,
            timeout: timeout
        };
    }

})();
