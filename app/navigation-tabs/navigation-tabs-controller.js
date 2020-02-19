'use strict';

// Register `naviBar` controller
angular.module('navigationTabs').controller('navigationTabsController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    $scope.logOut = function() {
        $rootScope.$emit('logOut');
        $rootScope.isLoggedIn = false;
        $rootScope.global_events = [];
        $rootScope.events_array = [];
    };
}]);