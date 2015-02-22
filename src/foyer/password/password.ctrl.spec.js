'use strict';

describe('FoyerPasswordController', function () {
    var $controller, $scope, $q;
    var vm;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _$q_, _$rootScope_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $q = _$q_;
    }));

    describe('vm.email', function () {
        beforeEach(function () {
            vm = $controller('FoyerPasswordController', {$scope: $scope});
        });

        it('should exist', function () {
            expect(vm.email).toBeDefined();
        });

        it('should be of type String', function () {
            expect(vm.email).toEqual(jasmine.any(String));
        });

        it('should initialise to an empty string', function () {
            expect(vm.email).toBe('');
        });
    });

    describe('vm.submit()', function () {
        var mocks = {
            keyboard: undefined,
            redirect: undefined,
            spinner: undefined,
            user: undefined
        };
        var deferreds = {
            recoverPassword: undefined
        };

        beforeEach(function () {
            mocks.keyboard = jasmine.createSpyObj('keyboard', ['hide']);
        });

        beforeEach(function () {
            mocks.redirect = jasmine.createSpyObj('redirect', ['to']);
        });

        beforeEach(function () {
            mocks.spinner = jasmine.createSpyObj('spinner', ['show', 'error']);
        });

        beforeEach(function () {
            mocks.user = jasmine.createSpyObj('user', ['recoverPassword']);

            var deferred = deferreds.recoverPassword = $q.defer();
            mocks.user.recoverPassword.and.returnValue(deferred.promise);
        });

        beforeEach(function () {
            vm = $controller('FoyerPasswordController', {
                $scope: $scope,
                keyboard: mocks.keyboard,
                redirect: mocks.redirect,
                spinner: mocks.spinner,
                user: mocks.user
            });
        });

        it('should exist', function () {
            expect(vm.submit).toBeDefined();
        });

        it('should be of type Function', function () {
            expect(vm.submit).toEqual(jasmine.any(Function));
        });

        it('should call "keyboard.hide()"', function () {
            vm.submit();

            expect(mocks.keyboard.hide).toHaveBeenCalled();
        });

        it('should call "spinner.show()"', function () {
            vm.submit();

            expect(mocks.spinner.show).toHaveBeenCalled();
        });

        it('should call "user.recoverPassword()"', function () {
            vm.email = 'test@example.com';

            vm.submit();

            expect(mocks.user.recoverPassword)
                .toHaveBeenCalledWith(vm.email);
        });

        describe('user.recoverPassword()', function () {
            describe('then()', function () {
                beforeEach(function () {
                    deferreds.recoverPassword.resolve();
                    vm.submit();
                    $scope.$digest();
                });

                it('should call "redirect.to()"', function () {
                    expect(mocks.redirect.to)
                        .toHaveBeenCalledWith('foyer.welcome', true);
                });
            });

            describe('catch()', function () {
                beforeEach(function () {
                    deferreds.recoverPassword.reject();
                    vm.submit();
                    $scope.$digest();
                });

                it('should call "console.error()"', function () {
                });

                it('should call "spinner.error()"', function () {
                    var message = 'Unable to issue Password Recovery email.';
                    expect(mocks.spinner.error).toHaveBeenCalledWith(message);
                });
            });

            describe('finally()', function () {
                beforeEach(function () {
                    vm.email = 'test@example.com';

                    deferreds.recoverPassword.resolve();
                    vm.submit();
                    $scope.$digest();
                });

                it('should reset "vm.email"', function () {
                    expect(vm.email).toBe('');
                });
            });
        });
    });
});
