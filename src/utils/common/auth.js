(function () {
    'use strict';

    angular.module('app.common')
        .factory('auth', AuthenticationService);

    /* @ngInject */
    function AuthenticationService($q, $timeout, $firebaseAuth, FBURL) {
        var ref = new Firebase(FBURL);
        var url = ref.root();
        var authObj = $firebaseAuth(url);

        var getUser = function getUserDataFromAuthUserObject(authUser) {
            return {
                id: authUser.uid,
                token: authUser.token
            };
        };

        return {
            newSession: function (email, password) {
                var deferred = $q.defer();

                authObj.$authWithPassword({email: email, password: password})
                    .then(function (authData) {
                        var user = getUser(authData);
                        deferred.resolve(user);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            },
            getSession: function () {
                var authData = authObj.$getAuth();
                return authData && getUser(authData);
            },
            endSession: function () {
                return $timeout(function () {
                    authObj.$unauth();
                }, 1);
            },
            hasSession: function () {
                var authData = authObj.$getAuth();
                return !!authData;
            },
            createAccount: function (name, email, password) {
                return authObj.$createUser({
                    email: email,
                    password: password
                });
            },
            updateAccountPassword: function (email, oldPassword, newPassword) {
                return authObj.$changePassword(email, oldPassword, newPassword);
            },
            recoverAccountPassword: function (email) {
                return authObj.$resetPassword(email);
            }
        };
    }

})();
