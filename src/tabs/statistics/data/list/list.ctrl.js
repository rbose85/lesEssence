(function () {
    'use strict';

    angular.module('app.tabs.statistics')
        .controller('TabStatisticsDataListController', TabStatisticsDataListCtrl);

    /* @ngInject */
    function TabStatisticsDataListCtrl($ionicPopup, previousTanks, spinner) {
        var vm = this;

        vm.tanks = previousTanks;

        vm.edit = function (tank) {
            console.log('--rb-- edit(tank): ', tank);
        };

        var deleteTank = function (tank) {
            spinner.show();

            vm.tanks.$remove(tank)
                .then(function () {
                    spinner.timeout('Success!');
                })
                .catch(function (error) {
                    console.error(angular.toJson(error, true));
                    spinner.error('Unable to delete Tank.');
                });
        };

        vm.remove = function (tank) {
            console.log('--rb-- delete(tank): ', tank);

            $ionicPopup.confirm({
                title: 'D E L E T E',
                template: 'Are you sure you want to delete this record?'
            })
                .then(function (isConfirmed) {
                    if (isConfirmed) {
                        deleteTank(tank);
                    }
                });
        };

    }

})();
