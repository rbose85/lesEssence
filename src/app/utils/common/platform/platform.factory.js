(function () {
    'use strict';

    angular.module('app.common')
        .factory('platform', PlatformService);

    /* @ngInject */
    function PlatformService() {

        return {
            isAndroid: function () {
                return ionic.Platform.isAndroid();
            },
            isIOS: function () {
                return ionic.Platform.isIOS();
            }
        };
    }

})();
