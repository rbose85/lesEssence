(function () {
    'use strict';

    angular.module('app.tabs.logbook')
        .config(Router);

    /* @ngInject */
    function Router($stateProvider) {
        $stateProvider
            .state('tabs.logbook', {
                url: '/logbook',
                abstract: true
            })
            .state('tabs.logbook.list', {
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
                    'logbook-tab@tabs': {
                        templateUrl: 'tabs/logbook/list/list.tpl.html',
                        controller: 'TabsLogbookListController as vm'
                    }
                }
            })
            .state('tabs.logbook.details', {
                url: '/details/{tankId:-[\w-]{19}}',
                views: {
                    'logbook-tab@tabs': {
                        templateUrl: 'tabs/logbook/details/details.tpl.html'
                    }
                }
            })
            .state('tabs.logbook.edit', {
                url: '/edit/{tankId:-[\w-]{19}}',
                views: {
                    'logbook-tab@tabs': {
                        templateUrl: 'tabs/logbook/edit/edit.tpl.html'
                    }
                }
            });
    }

})();
