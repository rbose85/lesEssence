(function () {
    'use strict';

    angular.module('app.foyer')
        .controller('FoyerSignupController', FoyerSignupCtrl);

    /* @ngInject */
    function FoyerSignupCtrl(keyboard, redirect, spinner, user) {
        var vm = this;

        vm.model = {};

        vm.submit = function () {
            if (vm.form.$invalid) {
                return;
            }

            keyboard.hide();
            spinner.show();

            user.create(vm.model.name, vm.model.email, vm.model.password)
                .then(function () {
                    vm.model = {};
                    return redirect.to('tabs.home', true);
                })
                .catch(function (error) {
                    console.error(angular.toJson(error, true));
                    spinner.error('Invalid details.');
                });
        };
    }

})();
