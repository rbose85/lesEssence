(function () {
    'use strict';

    angular.module('app.foyer')
        .controller('FoyerSigninController', FoyerSigninCtrl);

    /* @ngInject */
    function FoyerSigninCtrl(user, spinner, redirect) {
        var vm = this;

        vm.submit = function () {
            if (vm.form.$invalid) {
                return;
            }

            spinner.show();

            user.signIn(vm.form.email.$modelValue, vm.form.password.$modelValue)
                .then(function () {
                    return redirect.to('tabs.home', true);
                })
                .catch(function (error) {
                    console.error(angular.toJson(error, true));
                    spinner.error('Invalid credentials.');
                });
        };
    }

})();
