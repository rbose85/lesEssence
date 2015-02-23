(function () {
    'use strict';

    angular.module('app.tabs.home')
        .config(Router);

    /* @ngInject */
    function Router($stateProvider) {
        $stateProvider
            .state('tabs.home', {
                url: '/home',
                views: {
                    'home-tab': {
                        templateUrl: 'js/tabs/home/home.tpl.html'
                    }
                }
            });
    }

})();
