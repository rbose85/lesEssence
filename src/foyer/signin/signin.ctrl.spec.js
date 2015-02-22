'use strict';

describe('FoyerSigninController', function () {
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
            vm = $controller('FoyerSigninController', {$scope: $scope});
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

    describe('vm.password', function () {
        beforeEach(function () {
            vm = $controller('FoyerSigninController', {$scope: $scope});
        });

        it('should exist', function () {
            expect(vm.password).toBeDefined();
        });

        it('should be of type String', function () {
            expect(vm.password).toEqual(jasmine.any(String));
        });

        it('should initialise to an empty string', function () {
            expect(vm.password).toBe('');
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
            signIn: undefined
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
            mocks.user = jasmine.createSpyObj('user', ['signIn']);

            var deferred = deferreds.signIn = $q.defer();
            mocks.user.signIn.and.returnValue(deferred.promise);
        });

        beforeEach(function () {
            vm = $controller('FoyerSigninController', {
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

        it('should call "user.signIn()"', function () {
            vm.email = 'test@example.com';
            vm.password = 'password1234abcd';

            vm.submit();

            expect(mocks.user.signIn)
                .toHaveBeenCalledWith(vm.email, vm.password);
        });

        describe('user.signIn()', function () {
            describe('then()', function () {
                beforeEach(function () {
                    deferreds.signIn.resolve();
                    vm.submit();
                    $scope.$digest();
                });

                it('should call "redirect.to()"', function () {
                    expect(mocks.redirect.to)
                        .toHaveBeenCalledWith('tabs.home', true);
                });
            });

            describe('catch()', function () {
                beforeEach(function () {
                    deferreds.signIn.reject();
                    vm.submit();
                    $scope.$digest();
                });

                it('should call "console.error()"', function () {
                });

                it('should call "spinner.error()"', function () {
                    var message = 'Invalid credentials.';
                    expect(mocks.spinner.error).toHaveBeenCalledWith(message);
                });
            });

            describe('finally()', function () {
                beforeEach(function () {
                    vm.email = 'test@example.com';
                    vm.password = 'password1234abcd';

                    deferreds.signIn.resolve();
                    vm.submit();
                    $scope.$digest();
                });

                it('should reset "vm.email"', function () {
                    expect(vm.email).toBe('');
                });

                it('should reset "vm.email"', function () {
                    expect(vm.password).toBe('');
                });
            });
        });
    });
});
