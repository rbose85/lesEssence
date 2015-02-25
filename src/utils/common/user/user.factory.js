(function () {
    'use strict';

    angular.module('app.common')
        .factory('user', UserService);

    /* @ngInject */
    function UserService($firebase, FBURL, account, session) {
        var getSync = function (userId) {
            if (!userId) {
                console.error('UserService getSync(userId)');
            }

            var url = FBURL + '/users/' + userId + '/';
            var ref = new Firebase(url);
            return $firebase(ref);
        };

        var createUser = function (name, email, password) {
            return account.create(name, email, password)
                .then(function () {
                    return session.create(email, password);
                })
                .then(function (sessionData) {
                    return getSync(sessionData.id)
                        .$set({details: {name: name}});
                });
        };

        return {
            create: createUser,

            updatePassword: function (email, oldPassword, newPassword) {
                return account.password.update(email, oldPassword, newPassword);
            },
            recoverPassword: function (email) {
                return account.password.recover(email);
            },

            signIn: function (email, password) {
                return session.create(email, password);
            },
            isSignedIn: function () {
                return session.isActive();
            },
            signOut: function () {
                return session.end();
            },

            getId: function () {
                var sessionData = session.getActive();
                return sessionData && sessionData.id;
            },
            getToken: function () {
                var sessionData = session.getActive();
                return sessionData && sessionData.token;
            }
        };
    }

})();
