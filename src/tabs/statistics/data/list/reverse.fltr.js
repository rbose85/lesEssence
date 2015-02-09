(function () {
    'use strict';

    angular.module('app.tabs.statistics')
        .filter('reverse', ReverseFilter);

    /* @ngInject */
    function ReverseFilter() {

        function toArray(list) {
            var k, out = [];
            if (list) {
                if (angular.isArray(list)) {
                    out = list;
                }
                else if (typeof(list) === 'object') {
                    for (k in list) {
                        if (list.hasOwnProperty(k)) {
                            out.push(list[k]);
                        }
                    }
                }
            }
            return out;
        }

        return function (items) {
            return toArray(items).slice().reverse();
        };

    }

})();
