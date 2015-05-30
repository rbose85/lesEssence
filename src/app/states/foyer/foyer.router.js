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
                        templateUrl: 'js/foyer/welcome/welcome.tpl.html'
                    }
                }
            })
            .state('foyer.password', {
                url: '/password',
                views: {
                    '@': {
                        templateUrl: 'js/foyer/password/password.tpl.html',
                        controller: 'FoyerPasswordController as vm'
                    }
                }
            })
            .state('foyer.signin', {
                url: '/signin',
                views: {
                    '@': {
                        templateUrl: 'js/foyer/signin/signin.tpl.html',
                        controller: 'FoyerSigninController as vm'
                    }
                }
            })
            .state('foyer.signup', {
                url: '/signup',
                views: {
                    '@': {
                        templateUrl: 'js/foyer/signup/signup.tpl.html',
                        controller: 'FoyerSignupController as vm'
                    }
                }
            });
    }

})();
