(function () {
    'use strict';

    angular.module('app.foyer')
        .controller('FoyerSigninController', FoyerSigninCtrl);

    /* @ngInject */
    function FoyerSigninCtrl(redirect, spinner, user) {
        var vm = this;

        vm.model = {};

        vm.submit = function () {
            if (vm.form.$invalid) {
                return;
            }

            spinner.show();

            user.signIn(vm.model.email, vm.model.password)
                .then(function () {
                    vm.model = {};
                    return redirect.to('tabs.home', true);
                })
                .catch(function (error) {
                    console.error(angular.toJson(error, true));
                    spinner.error('Invalid credentials.');
                });
        };
    }

})();
