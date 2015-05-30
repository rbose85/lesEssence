(function () {
    'use strict';

    angular.module('app.common')
        .factory('user', UserService);

    /* @ngInject */
    function UserService(FBURL, account, session) {
        var getRef = function (userId) {
            if (!userId) {
                console.error('UserService getRef(userId)');
            }

            var url = FBURL + '/users/' + userId + '/';
            return new Firebase(url);
        };

        var createUser = function (name, email, password) {
            return account.create(name, email, password)
                .then(function () {
                    return session.create(email, password);
                })
                .then(function (sessionData) {
                    return getRef(sessionData.id)
                        .set({details: {name: name}});
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
