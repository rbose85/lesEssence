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
                        templateUrl: 'foyer/welcome/welcome.tpl.html'
                    }
                }
            })
            .state('foyer.password', {
                url: '/password',
                views: {
                    '@': {
                        templateUrl: 'foyer/password/password.tpl.html',
                        controller: 'FoyerPasswordController as vm'
                    }
                }
            })
            .state('foyer.signin', {
                url: '/signin',
                views: {
                    '@': {
                        templateUrl: 'foyer/signin/signin.tpl.html',
                        controller: 'FoyerSigninController as vm'
                    }
                }
            })
            .state('foyer.signup', {
                url: '/signup',
                views: {
                    '@': {
                        templateUrl: 'foyer/signup/signup.tpl.html',
                        controller: 'FoyerSignupController as vm'
                    }
                }
            });
    }

})();
