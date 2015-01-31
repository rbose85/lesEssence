(function () {
    'use strict';

    angular.module('app.firebase')
        .factory('account', AccountService);

    /* @ngInject */
    function AccountService(auth) {
        var authObj = auth.getManager();

        var createAccount = function (name, email, password) {
            return authObj.$createUser({
                email: email,
                password: password
            });
        };

        var updatePassword = function (email, oldPassword, newPassword) {
            return authObj.$changePassword(email, oldPassword, newPassword);
        };

        var recoverPassword = function (email) {
            return authObj.$resetPassword(email);
        };

        return {
            create: createAccount,
            password: {
                update: updatePassword,
                recover: recoverPassword
            }
        };
    }

})();
