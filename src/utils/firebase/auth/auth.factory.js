(function () {
    'use strict';

    angular.module('app.firebase')
        .factory('auth', AuthenticationService);

    /* @ngInject */
    function AuthenticationService($firebaseAuth, FBURL) {
        var ref = new Firebase(FBURL);
        var manager = $firebaseAuth(ref);

        return {
            getManager: function () {
                return manager;
            }
        };
    }

})();
