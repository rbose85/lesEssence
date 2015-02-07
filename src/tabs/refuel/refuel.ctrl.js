(function () {
    'use strict';

    angular.module('app.tabs.refuel')
        .controller('TabsRefuelController', TabsRefuelCtrl);

    /* @ngInject */
    function TabsRefuelCtrl() {
        var vm = this;

        vm.clicker = function () {
            console.log('-rb-');
        };
    }

})();
