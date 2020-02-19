'use strict';

// Register `polls` controller
angular.module('polls').controller('pollsController', ['$scope', '$rootScope', '$location', 'pollsService', function ($scope, $rootScope, $location, pollsService) {
    if ($rootScope.isLoggedIn == false) {
        $location.path('/');
    }
    if(!$scope.polls_array) {
        $scope.polls_array = [];
    }
    if(!$scope.polls_options_array) {
        $scope.polls_options_array = [];
    }
    $scope.editPolls = pollsService.getEditedPolls();
    $scope.newPolls = pollsService.getNewPolls();
    $scope.newPollsOptions = pollsService.getNewPollsOptions();

    $scope.getPollsAndOptionsFromDB = function() {
        pollsService.getPollsFromDB()
            .then(function () {
                $scope.polls_array = pollsService.getPolls();
                pollsService.getPollsOptionsFromDB()
                    .then(function() {
                        $scope.polls_options_array = pollsService.getPollsOptions();
                    });
            });
    };

    $scope.savePolls = function() {
        pollsService.savePolls();
    };

    $scope.setPollsOptions =  function() {
        pollsService.setPollsOptions($scope.polls_options_array);
    };

    $scope.setPolls = function() {
        pollsService.setPolls($scope.polls_array);
    };

    $scope.setNewPolls = function() {
        pollsService.setNewPolls($scope.newPolls);
    };

    $scope.setNewPollsOptions = function() {
        pollsService.setNewPollsOptions($scope.newPollsOptions);
    };

    $scope.voteCommitted = function(option) {
        pollsService.writeVoteInDB(option);
    };
}]);