(function () {
    'use strict';

    angular.module('app.tabs.statistics')
        .controller('TabStatisticsDataListController', TabStatisticsDataListCtrl);

    /* @ngInject */
    function TabStatisticsDataListCtrl(previousTanks) {
        var vm = this;

        vm.tanks = previousTanks;
    }

})();
