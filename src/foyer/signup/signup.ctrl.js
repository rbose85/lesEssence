(function () {
    'use strict';

    angular.module('app.foyer')
        .controller('FoyerSignupController', FoyerSignupCtrl);

    /* @ngInject */
    function FoyerSignupCtrl(user, spinner, redirect) {
        var vm = this;

        vm.submit = function () {
            if (vm.form.$invalid) {
                return;
            }

            spinner.show();

            user.create(vm.form.name.$modelValue, vm.form.email.$modelValue, vm.form.password.$modelValue)
                .then(function () {
                    return redirect.to('tabs.home', true);
                })
                .catch(function (error) {
                    console.error(angular.toJson(error, true));
                    spinner.error('Invalid details.');
                });
        };
    }

})();
