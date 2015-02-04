(function () {
    'use strict';

    angular.module('app.foyer')
        .controller('PasswordFoyerController', PasswordController);

    /* @ngInject */
    function PasswordController(user, spinner, redirect) {
        var vm = this;

        vm.submit = function () {
            if (vm.form.$invalid) {
                return;
            }

            spinner.show();

            user.resetPassword(vm.form.email.$modelValue)
                .then(function () {
                    return redirect.to('foyer.welcome', true);
                })
                .catch(function (error) {
                    console.error(angular.toJson(error, true));
                    spinner.error('Unable to issue Password Recovery email.');
                });
        };
    }

})();
