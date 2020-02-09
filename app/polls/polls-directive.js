'use strict';

// Register `polls` directive, along with its associated controller and template
angular.module('polls').directive('pollsControl', ['$rootScope' ,function($rootScope) {
    return {
        templateUrl: 'app/polls/polls-template.html',
        controller: 'pollsController',
        link: function(scope, elem) {
            $('#currentTabText').text('Polls');
            $('#saveIcon').hide();
            $('#reloadIcon').hide();
            $('#globalIcon').hide();
            if($rootScope.deregisterEditedListener && $rootScope.deregisterCreatedListener) {
                $rootScope.deregisterEditedListener();
                $rootScope.deregisterCreatedListener();
            }
        }
    };
}]);