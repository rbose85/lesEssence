(function () {
    'use strict';

    angular.module('app.tabs.statistics')
        .config(Router);

    /* @ngInject */
    function Router($stateProvider) {
        $stateProvider
            .state('tabs.statistics', {
                url: '/statistics',
                abstract: true
            })
            .state('tabs.statistics.summary', {
                url: '',
                views: {
                    'statistics-tab@tabs': {
                        templateUrl: 'js/tabs/statistics/summary/summary.tpl.html'
                    }
                }
            })
            .state('tabs.statistics.data', {
                url: '/data',
                abstract: true
            })
            .state('tabs.statistics.data.list', {
                url: '',
                resolve: {
                    async: function (tank) {
                        return tank.all();
                    },
                    previousTanks: function (async) {
                        return async.$loaded();
                    }
                },
                views: {
                    'statistics-tab@tabs': {
                        templateUrl: 'js/tabs/statistics/data/list/list.tpl.html',
                        controller: 'TabStatisticsDataListController as vm'
                    }
                }
            })
            .state('tabs.statistics.data.details', {
                url: '/{tankId:[0-9]{1,4}}',
                views: {
                    'statistics-tab@tabs': {
                        templateUrl: 'js/tabs/statistics/data/details/details.tpl.html',
                        controller: 'TabStatisticsDataDetailsController as vm'
                    }
                }
            });
    }

})();
