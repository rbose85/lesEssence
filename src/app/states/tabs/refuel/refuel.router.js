(function () {
    'use strict';

    angular.module('app.tabs.refuel')
        .config(Router);

    /* @ngInject */
    function Router($stateProvider) {
        $stateProvider
            .state('tabs.refuel', {
                url: '/refuel',
                views: {
                    'refuel-tab@tabs': {
                        templateUrl: 'tabs/refuel/refuel.tpl.html',
                        controller: 'TabsRefuelController as vm'
                    }
                }
            });
    }

})();
