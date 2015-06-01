(function () {
    'use strict';

    angular.module('app.tabs')
        .config(Router);

    /* @ngInject */
    function Router($stateProvider) {
        $stateProvider
            .state('tabs', {
                url: '/tabs',
                abstract: true,
                templateUrl: 'tabs/tabs.tpl.html'
            });
    }

})();
