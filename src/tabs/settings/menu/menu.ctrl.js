(function () {
    'use strict';

    angular.module('app.tabs.settings')
        .controller('TabsSettingsMenuController', TabsSettingsMenuCtrl);

    /* @ngInject */
    function TabsSettingsMenuCtrl(user, redirect) {
        var vm = this;

        vm.signout = function () {
            user.signOut()
                .then(function () {
                    return redirect.to('foyer.welcome', true);
                });
        };
    }

})();
