(function () {
    'use strict';

    angular.module('app.foyer')
        .config(FoyerRouter)
        .controller('PasswordFoyerController', PasswordController)
        .controller('SignInFoyerController', SignInController)
        .controller('SignUpFoyerController', SignUpController);

    /* @ngInject */
    function FoyerRouter($stateProvider) {
        $stateProvider
            .state('foyer', {
                url: '/foyer',
                abstract: true
            })
            .state('foyer.welcome', {
                url: '',
                views: {
                    '@': {
                        templateUrl: 'js/foyer/welcome.html'
                    }
                }
            })
            .state('foyer.password', {
                url: '/password',
                views: {
                    '@': {
                        templateUrl: 'js/foyer/password.html',
                        controller: 'PasswordFoyerController as vm'
                    }
                }
            })
            .state('foyer.signin', {
                url: '/signin',
                views: {
                    '@': {
                        templateUrl: 'js/foyer/signin.html',
                        controller: 'SignInFoyerController as vm'
                    }
                }
            })
            .state('foyer.signup', {
                url: '/signup',
                views: {
                    '@': {
                        templateUrl: 'js/foyer/signup.html',
                        controller: 'SignUpFoyerController as vm'
                    }
                }
            });
    }

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

    /* @ngInject */
    function SignInController(user, spinner, redirect) {
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

    /* @ngInject */
    function SignUpController(user, spinner, redirect) {
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
