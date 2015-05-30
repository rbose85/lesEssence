(function () {
    'use strict';

    angular.module('app.foyer')
        .controller('FoyerSignupController', FoyerSignupCtrl);

    /* @ngInject */
    function FoyerSignupCtrl(keyboard, redirect, spinner, user) {
        var vm = this;

        vm.name = '';
        vm.email = '';
        vm.password = '';

        vm.submit = function () {
            keyboard.hide();
            spinner.show();

            user.create(vm.name, vm.email, vm.password)
                .then(function () {
                    return redirect.to('tabs.home', true);
                })
                .catch(function (error) {
                    console.error(angular.toJson(error, true));
                    spinner.error('Invalid details.');
                })
                .finally(function () {
                    vm.name = '';
                    vm.email = '';
                    vm.password = '';
                });
        };
    }

})();
