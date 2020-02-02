'use strict';

// Register `appointments` controller
angular.module('appointments').controller('appointmentsController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    if($rootScope.isLoggedIn == false) {
        $location.path('/');
    }
}]);