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
                templateUrl: 'js/tabs/tabs.html'
            })
            .state('tabs.home', {
                url: '/home',
                views: {
                    'home-tab': {
                        templateUrl: 'js/tabs/home/home.html',
                        controller: 'HomeTabController as vm'
                    }
                }
            })
            .state('tabs.history', {
                url: '/history',
                views: {
                    'history-tab': {
                        templateUrl: 'js/tabs/history/history.html',
                        controller: 'HistoryTabController as vm'
                    }
                },
                resolve: {
                    async: function (tank) {
                        return tank.getAll();
                    },
                    previousTanks: function (async) {
                        return async.$loaded();
                    }
                }
            })
            .state('tabs.settings', {
                url: '/settings',
                views: {
                    'settings-tab': {
                        templateUrl: 'js/tabs/settings/settings.html',
                        controller: 'SettingsTabController as vm'
                    }
                }
            })
            .state('tabs.statistics', {
                url: '/statistics',
                views: {
                    'statistics-tab': {
                        templateUrl: 'js/tabs/statistics/statistics.html',
                        controller: 'StatisticsTabController as vm'
                    }
                }
            });
    }

})();
