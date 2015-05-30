(function () {
    'use strict';

    angular.module('app.common')
        .factory('redirect', RedirectAppStateService);

    /* @ngInject */
    function RedirectAppStateService($state, $ionicHistory) {
        return {
            to: function redirectToState(state, resetNavigationStack) {
                if (resetNavigationStack) {
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true,
                        historyRoot: true
                    });
                }

                return $state.go(state);
            }
        };
    }

})();
