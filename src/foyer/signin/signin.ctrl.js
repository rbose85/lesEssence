(function () {
    'use strict';

    angular.module('app.foyer')
        .controller('FoyerSigninController', FoyerSigninCtrl);

    /* @ngInject */
    function FoyerSigninCtrl(keyboard, redirect, spinner, user) {
        var vm = this;

        vm.email = '';
        vm.password = '';

        vm.submit = function () {
            keyboard.hide();
            spinner.show();

            user.signIn(vm.email, vm.password)
                .then(function () {
                    return redirect.to('tabs.home', true);
                })
                .catch(function (error) {
                    console.error(angular.toJson(error, true));
                    spinner.error('Invalid credentials.');
                })
                .finally(function () {
                    vm.email = '';
                    vm.password = '';
                });
        };
    }

})();
