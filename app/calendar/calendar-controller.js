'use strict';

// Register `calendar` controller
angular.module('calendar').controller('calendarController', ['$scope', '$rootScope', '$location' , 'calendarService', function ($scope, $rootScope, $location, calendarService) {
    $scope.clickedEvent = calendarService.getClickedEvent();
    $scope.events_array = calendarService.getEvents();
    $scope.changed_events = calendarService.getChangedEvents();
    $scope.deleted_events = calendarService.getDeletedEvents();

    if($rootScope.isLoggedIn == true) {
        calendarService.loadEvents();
    }

    if($rootScope.isLoggedIn == false) {
        $location.path('/');
    }

    $scope.saveEvents = function () {
        calendarService.saveEvents();
    };

    $scope.deleteEvents = function (event) {
        calendarService.deleteEvents(event);
    };

    $scope.confirmButtonClickEvent = function (modalInput) {
        if (modalInput.title && modalInput.start && modalInput.end) {
            if ((modalInput.startTime && modalInput.endTime) || (!modalInput.startTime && !modalInput.endTime)) {
                if (modalInput.usage === "add") {
                    calendarService.createEvent(modalInput);
                } else if (modalInput.usage === "edit") {
                    calendarService.editEvent(modalInput);
                }
            } else {
                window.alert('If you want to edit the specific time of an event, please make' +
                    'sure that both inputs are filled.');
            }
        } else {
            window.alert('The Fields Title, Start Date and End Date must be filled.');
        }
    };


}]);