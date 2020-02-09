'use strict';

// Register `modal` directive, which provides the DOM attachments for the popup modal
angular.module('calendar').directive('modalControl', ['$rootScope', function ($rootScope) {
    return {
        controller: 'calendarController',
        link: function (scope, elem) {
            scope.confirmButtonHandler = function() {
                var modalInput = {
                    usage: $('.modal')[0].attributes.usage.value,
                    title: $('#newEventTitle')[0].value,
                    start: $('#newEventStartDate')[0].value,
                    end: $('#newEventEndDate')[0].value,
                    startTime: $('#newEventStartTime')[0].value,
                    endTime: $('#newEventEndTime')[0].value,
                    color: $('#newEventColor')[0].value,
                    textColor: $('#newEventTextColor')[0].value,
                    id: $rootScope.clickedEvent.id,
                    global: $('#newEventGlobal')[0].checked
                };
                scope.confirmButtonClickEvent(modalInput);
            };
        }
    };
}]);