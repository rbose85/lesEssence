(function () {
    'use strict';

    angular.module('app.firebase')
        .factory('auth', AuthenticationService);

    /* @ngInject */
    function AuthenticationService($firebaseAuth, FBURL) {
        var ref = new Firebase(FBURL);
        var url = ref.root();
        var manager = $firebaseAuth(url);

        return {
            getManager: function () {
                return manager;
            }
        };
    }

})();
