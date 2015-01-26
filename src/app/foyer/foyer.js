(function () {
    'use strict';

    angular.module('app.foyer', [])
        .config(['$stateProvider', Router])
        .controller('Passwd', Passwd)
        .controller('SignIn', SignIn)
        .controller('SignUp', SignUp);

    function Router($stateProvider) {
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
                        controller: 'Passwd as vm'
                    }
                }
            })
            .state('foyer.signin', {
                url: '/signin',
                views: {
                    '@': {
                        templateUrl: 'js/foyer/signin.html',
                        controller: 'SignIn as vm'
                    }
                }
            })
            .state('foyer.signup', {
                url: '/signup',
                views: {
                    '@': {
                        templateUrl: 'js/foyer/signup.html',
                        controller: 'SignUp as vm'
                    }
                }
            });
    }

    function Passwd() {}

    function SignIn() {}

    function SignUp() {}

})();
