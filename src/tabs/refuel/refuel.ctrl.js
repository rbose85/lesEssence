(function () {
    'use strict';

    angular.module('app.tabs.refuel')
        .controller('TabsRefuelController', TabsRefuelCtrl);

    /* @ngInject */
    function TabsRefuelCtrl(keyboard, redirect, spinner, tank) {
        var vm = this;

        vm.model = {};

        vm.submit = function () {
            if (vm.form.$invalid) {
                return;
            }

            keyboard.hide();
            spinner.show();

            tank.add({
                date: new Date().toJSON(),
                milage: vm.model.milage,
                rate: vm.model.price,
                volume: vm.model.volume
            })
                .then(function () {
                    vm.model = {};
                    return redirect.to('tabs.home');
                })
                .catch(function (error) {
                    console.error(angular.toJson(error, true));
                    spinner.error('Invalid details.');
                });
        };
    }

})();
