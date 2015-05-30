(function () {
    'use strict';

    angular.module('app.common')
        .factory('tank', TankService);

    /* @ngInject */
    function TankService($firebaseArray, FBURL, user) {
        var url = FBURL + '/users/' + user.getId() + '/tanks/';
        var ref = new Firebase(url);
        var list = $firebaseArray(ref);

        return {
            add: function (tankData) {
                return list.$add(tankData);
            },
            all: function () {
                return list;
            }
        };
    }

})();
