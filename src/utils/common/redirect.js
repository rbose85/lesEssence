(function () {
    'use strict';

    angular.module('app.common')
        .factory('redirect', RedirectAppStateService);

    /* @ngInject */
    function RedirectAppStateService($state, $ionicHistory) {
        return {
            to: function redirectToState(state, removeCachedViews) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    historyRoot: true
                });

                if (removeCachedViews) {
                    $ionicHistory.clearCache();
                }

                return $state.go(state);
            }
        };
    }

})();
