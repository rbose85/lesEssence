(function () {
    'use strict';

    angular.module('app.tabs.settings')
        .config(Router);

    /* @ngInject */
    function Router($stateProvider) {
        $stateProvider
            .state('tabs.settings', {
                url: '/settings',
                abstract: true
            })
            .state('tabs.settings.account', {
                url: '/account',
                views: {
                    'settings-tab@tabs': {
                        templateUrl: 'tabs/settings/account/account.tpl.html'
                    }
                }
            })
            .state('tabs.settings.contact', {
                url: '/contact',
                views: {
                    'settings-tab@tabs': {
                        templateUrl: 'tabs/settings/contact/contact.tpl.html'
                    }
                }
            })
            .state('tabs.settings.help', {
                url: '/help',
                views: {
                    'settings-tab@tabs': {
                        templateUrl: 'tabs/settings/help/help.tpl.html'
                    }
                }
            })
            .state('tabs.settings.menu', {
                url: '',
                views: {
                    'settings-tab@tabs': {
                        templateUrl: 'tabs/settings/menu/menu.tpl.html',
                        controller: 'TabsSettingsMenuController as vm'
                    }
                }
            })
            .state('tabs.settings.options', {
                url: '/options',
                views: {
                    'settings-tab@tabs': {
                        templateUrl: 'tabs/settings/options/options.tpl.html'
                    }
                }
            });
    }

})();
