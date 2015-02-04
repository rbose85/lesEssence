(function () {
    'use strict';

    angular.module('app.foyer')
        .config(FoyerRouter);

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

})();
