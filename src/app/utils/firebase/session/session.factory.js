(function () {
    'use strict';

    angular.module('app.firebase')
        .factory('session', SessionService);

    /* @ngInject */
    function SessionService($timeout, auth) {
        var authObj = auth.getManager();

        var getSessionData = function (authData) {
            return {
                id: authData.uid,
                token: authData.token
            };
        };

        return {
            create: function (email, password) {
                return authObj.$authWithPassword({
                    email: email,
                    password: password
                })
                    .then(function (authData) {
                        return getSessionData(authData);
                    });
            },
            end: function () {
                return $timeout(function () {
                    authObj.$unauth();
                }, 0);
            },
            getActive: function () {
                var authData = authObj.$getAuth();
                return authData && getSessionData(authData);
            },
            isActive: function () {
                var authData = authObj.$getAuth();
                return !!authData;
            }
        };
    }

})();
