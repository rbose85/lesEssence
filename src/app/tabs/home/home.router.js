(function () {
    'use strict';

    angular.module('app.tabs.home')
        .config(Router);

    /* @ngInject */
    function Router($stateProvider) {
        $stateProvider
            .state('tabs.home', {
                url: '/home',
                resolve: {
                    async: function (tank) {
                        return tank.all();
                    },
                    previousTanks: function (async) {
                        return async.$loaded();
                    }
                },
                views: {
                    'home-tab': {
                        templateUrl: 'js/tabs/home/home.tpl.html',
                        controller: 'TabsHomeController as vm'
                    }
                }
            });
    }

})();
