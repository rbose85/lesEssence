(function () {
    'use strict';

    angular.module('app.tabs.home')
        .controller('TabsHomeController', TabsHomeCtrl);

    /* @ngInject */
    function TabsHomeCtrl($ionicHistory, $ionicNavBarDelegate, $state) {
        var vm = this;

        vm.goToHistoryAdd = function () {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: false
            });
            $ionicNavBarDelegate.showBackButton(true);


            // NEED TO MANUALLY ENTER BACK STATE INTO STACK!
            $state.go('tabs.statistics.history.add', {backlocation: 'tabs.home'});
            //$state.go('');
        };
    }

})();
