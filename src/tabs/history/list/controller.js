(function () {
    'use strict';

    angular.module('app.tabs.history')
        .controller('HistoryTabController', HistoryController);

    /* @ngInject */
    function HistoryController(previousTanks) {
        var vm = this;

        vm.tanks = previousTanks;
    }

})();
