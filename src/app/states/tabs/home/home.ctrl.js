(function () {
    'use strict';

    angular.module('app.tabs.home')
        .controller('TabsHomeController', TabsHomeCtrl);

    /* @ngInject */
    function TabsHomeCtrl($timeout, previousTanks) {
        var vm = this;

        var getAverageMPG = function () {
            return $timeout(function () {
                var sum = previousTanks
                    .reduce(function (last, current) {
                        var mpg = current.milage / (current.volume * 0.219969);
                        return last + mpg;
                    }, 0);
                return sum / previousTanks.length;
            }, 0);
        };

        getAverageMPG()
            .then(function (result) {
                vm.averageMPG = result;
            });

        var getAveragePPL = function () {
            return $timeout(function () {
                var sum = previousTanks
                    .reduce(function (last, current) {
                        return last + current.rate;
                    }, 0);
                return sum / previousTanks.length / 100;
            }, 0);
        };

        getAveragePPL()
            .then(function (result) {
                vm.averagePPL = result;
            });

        var getAverageTank = function () {
            return $timeout(function () {
                var sum = previousTanks
                    .reduce(function (last, current) {
                        return last + ((current.rate / 100) * current.volume);
                    }, 0);
                return sum / previousTanks.length;
            }, 0);
        };

        getAverageTank()
            .then(function (result) {
                vm.averageTank = result;
            });
    }

})();
