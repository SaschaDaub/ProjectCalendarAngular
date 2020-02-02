'use strict';

// Register `polls` controller
angular.module('polls').controller('pollsController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    if($rootScope.isLoggedIn == false) {
        $location.path('/');
    }
}]);