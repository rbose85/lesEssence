(function () {
    'use strict';

    angular.module('app.tabs.refuel')
        .controller('TabsRefuelController', TabsRefuelCtrl);

    /* @ngInject */
    function TabsRefuelCtrl(keyboard, platform, redirect, spinner, tank) {
        var vm = this;

        vm.isIOS = platform.isIOS();
        vm.isAndroid = platform.isAndroid();

        vm.volume = '';
        vm.price = '';
        vm.milage = '';

        vm.submit = function () {
            keyboard.hide();
            spinner.show();

            tank.add({
                date: new Date().toJSON(),
                milage: vm.milage,
                rate: vm.price,
                volume: vm.volume
            })
                .then(function () {
                    return redirect.to('tabs.logbook.list');
                })
                .catch(function (error) {
                    console.error(angular.toJson(error, true));
                    spinner.error('Invalid details.');
                })
                .finally(function () {
                    vm.volume = '';
                    vm.price = '';
                    vm.milage = '';
                });
        };
    }

})();
