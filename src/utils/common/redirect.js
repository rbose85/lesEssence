(function () {
    'use strict';

    angular.module('app.common')
        .factory('redirect', RedirectAppStateService);

    /* @ngInject */
    function RedirectAppStateService($state, $ionicHistory) {
        return {
            to: function redirectToState(state, resetNavigationStack) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true,
                    historyRoot: true
                });

                if (resetNavigationStack) {
                    $ionicHistory.clearHistory();
                    $ionicHistory.clearCache();
                }

                return $state.go(state);
            }
        };
    }

})();
