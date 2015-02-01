(function () {
    'use strict';

    angular.module('app.foyer', [])
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
            .state('foyer.passwd', {
                url: '/passwd',
                views: {
                    '@': {
                        templateUrl: 'js/foyer/passwd.html',
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
    function PasswordController() {}

    /* @ngInject */
    function SignInController() {}

    /* @ngInject */
    function SignUpController() {}

})();
