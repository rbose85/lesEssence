(function () {
    'use strict';

    angular.module('app.foyer')
        .controller('FoyerPasswordController', FoyerPasswordCtrl);

    /* @ngInject */
    function FoyerPasswordCtrl(user, spinner, redirect) {
        var vm = this;

        vm.model = {};

        vm.submit = function () {
            if (vm.form.$invalid) {
                return;
            }

            spinner.show();

            user.resetPassword(vm.model.email)
                .then(function () {
                    vm.model = {};
                    return redirect.to('foyer.welcome', true);
                })
                .catch(function (error) {
                    console.error(angular.toJson(error, true));
                    spinner.error('Unable to issue Password Recovery email.');
                });
        };
    }

})();
