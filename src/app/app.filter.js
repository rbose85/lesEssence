(function () {
    'use strict';

    angular.module('app')
        .filter('dashcase', ToDashCaseFilter);

    /* @ngInject */
    function ToDashCaseFilter() {
        return function (items) {
            return items && items.replace(/\.+/g, '-');
        };
    }

})();
