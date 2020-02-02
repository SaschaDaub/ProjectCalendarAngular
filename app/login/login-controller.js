'use strict';

// Register `login` controller
angular.module('login').controller('loginController', ['$scope', '$rootScope', 'loginService', function ($scope, $rootScope, loginService) {
    $scope.isLoggedIn = loginService.getIsLoggedIn();

    $scope.logIn = function(userName, password) {
        loginService.logIn(userName, password);
    };

    $rootScope.$on('logIn', function (event, args) {
        loginService.logIn(args.userName, args.password);
    });

}]);