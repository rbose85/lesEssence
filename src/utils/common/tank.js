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
            getAll: function () {
                return sync.$asArray();
            }
        };
    }

})();
