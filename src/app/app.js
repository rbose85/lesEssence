(function () {
    'use strict';

    angular.module('app', [
        'ionic',
        'app.foyer'
    ])
        .config(['$urlRouterProvider', function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/foyer');
        }]);

})();
