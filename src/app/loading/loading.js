(function () {
    'use strict';

    angular.module('app.loading', [])
        .config(SplashScreenRouter);

    /* @ngInject */
    function SplashScreenRouter($stateProvider) {

        var isUserSignedIn = function (ready, user) {
            return user.isSignedIn();
        };

        $stateProvider
            .state('loading', {
                url: '',
                abstract: true
            })
            .state('loading.data', {
                url: '',
                resolve: {
                    ready: function ($ionicPlatform) {
                        return $ionicPlatform.ready();
                    },
                    isUser: isUserSignedIn
                },
                onEnter: function (isUser, redirect, splashscreen) {
                    redirect.to(isUser ? 'tabs.home' : 'foyer.welcome', true);
                    splashscreen.hide();
                }
            });
    }

})();
