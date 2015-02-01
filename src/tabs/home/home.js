(function () {
    'use strict';

    angular.module('app.tabs.home', [])
        .controller('HomeTabController', HomeController);

    /* @ngInject */
    function HomeController(user, redirect) {
        var vm = this;

        vm.signout = function () {
            user.signOut()
                .then(function () {
                    return redirect.to('foyer.welcome');
                });
        };
    }

})();
