(function () {
    'use strict';

    angular.module('app.tabs.settings')
        .controller('TabsSettingsMenuController', TabsSettingsMenuCtrl);

    /* @ngInject */
    function TabsSettingsMenuCtrl(redirect, user) {
        var vm = this;

        vm.signout = function () {
            user.signOut()
                .then(function () {
                    return redirect.to('foyer.welcome', true);
                });
        };
    }

})();
