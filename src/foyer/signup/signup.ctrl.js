(function () {
    'use strict';

    angular.module('app.foyer')
        .controller('FoyerSignupController', FoyerSignupCtrl);

    /* @ngInject */
    function FoyerSignupCtrl(user, spinner, redirect) {
        var vm = this;

        vm.model = {};

        vm.submit = function () {
            if (vm.form.$invalid) {
                return;
            }

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
