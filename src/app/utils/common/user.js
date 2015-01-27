(function () {
    'use strict';

    angular.module('app.common')
        .factory('user', UserService);

    /* @ngInject */
    function UserService($q, $firebase, auth, FBURL) {

        var getSync = function (userId) {
            var url = FBURL + 'users/' + userId + '/';
            var ref = new Firebase(url);
            return $firebase(ref);
        };

        var authenticateUser = function (email, password) {
            var deferred = $q.defer();

            auth.newSession(email, password)
                .then(function (session) {
                    return getSync().$update({
                        auth: {token: session.token}
                    });
                })
                .then(function (session) {
                    deferred.resolve(session);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        var createUser = function (name, email, password) {
            var deferred = $q.defer();

            auth.createAccount(name, email, password)
                .then(function () {
                    return auth.newSession(email, password);
                })
                .then(function (user) {
                    return getSync(user.id).$set({
                        auth: {token: user.token},
                        details: {name: name}
                    });
                })
                .catch(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        return {
            create: createUser,
            signIn: authenticateUser,
            signOut: function () {
                var deferred = $q.defer();

                auth.endSession()
                    .then(function () {
                        deferred.resolve();
                    })
                    .catch(function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            },
            updatePassword: function (email, oldPasswd, newPasswd) {
                return auth.updateAccountPassword(email, oldPasswd, newPasswd);
            },
            recoverPassword: function (email) {
                return auth.recoverAccountPassword(email);
            },

            isSignedIn: function () {
                return auth.hasSession();
            },
            getId: function () {
                var session = auth.getSession();
                return session && session.id;
            },
            getToken: function () {
                var session = auth.getSession();
                return session && session.token;
            }
        };
    }

})();
