(function () {
    'use strict';

    angular.module('app.common')
        .factory('tank', TankService);

    /* @ngInject */
    function TankService($firebase, FBURL, user) {
        var url = FBURL + '/users/' + user.getId() + '/tanks/';
        var ref = new Firebase(url);
        var sync = $firebase(ref);

        return {
            add: function (tankData) {
                return sync.$push(tankData);
            },
            getAll: function () {
                return sync.$asArray();
            }
        };
    }

})();
