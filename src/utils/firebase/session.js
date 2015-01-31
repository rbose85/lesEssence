(function () {
    'use strict';

    angular.module('app.firebase')
        .factory('session', SessionService);

    /* @ngInject */
    function SessionService($q, $timeout, auth) {
        var authObj = auth.getManager();

        var getSessionData = function (authData) {
            return {
                id: authData.uid,
                token: authData.token
            };
        };

        return {
            create: function (email, password) {
                var deferred = $q.defer();

                authObj.$authWithPassword({email: email, password: password})
                    .then(function (authData) {
                        var sessionData = getSessionData(authData);
                        deferred.resolve(sessionData);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
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
