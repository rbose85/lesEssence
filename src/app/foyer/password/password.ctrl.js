(function () {
    'use strict';

    angular.module('app.foyer')
        .controller('FoyerPasswordController', FoyerPasswordCtrl);

    /* @ngInject */
    function FoyerPasswordCtrl(keyboard, redirect, spinner, user) {
        var vm = this;

        vm.email = '';

        vm.submit = function () {
            keyboard.hide();
            spinner.show();

            user.recoverPassword(vm.email)
                .then(function () {
                    redirect.to('foyer.welcome', true);
                })
                .catch(function (error) {
                    console.error(angular.toJson(error, true));
                    spinner.error('Unable to issue Password Recovery email.');
                })
                .finally(function () {
                    vm.email = '';
                });
        };
    }

})();
