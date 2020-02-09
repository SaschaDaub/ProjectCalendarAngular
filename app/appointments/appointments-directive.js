'use strict';

// Register `appointments` directive, along with its associated controller and template
angular.module('appointments').directive('appointmentsControl', ['$rootScope' ,function($rootScope) {
    return {
        templateUrl: 'app/appointments/appointments-template.html',
        controller: 'appointmentsController',
        link: function(scope, elem) {
            var calendarEl = $('<div/>').attr('id', 'calendar');
            var calendarPar = $('<div/>').attr('id', 'calendarPar').append(calendarEl);
            var mainContentEl = $('#mainContent');

            if($rootScope.deregisterEditedListener && $rootScope.deregisterCreatedListener) {
                $rootScope.deregisterEditedListener();
                $rootScope.deregisterCreatedListener();
            }
            $('#currentTabText').text('Appointments');
            $('#saveIcon').hide();
            $('#reloadIcon').hide();
            $('#globalIcon').hide();

            mainContentEl.append(calendarPar);
            $('#calendar').fullCalendar({
                plugins: ['list'],
                height: 400,
                defaultView: 'listWeek',
                events: scope.events_array
            });

            $('.fc-right').css('margin-left', '53%').css('width', '10%');
            $('.fc-center').css('margin-left', '-30%');

            var eventsOverview = $('<div/>').attr('id', 'eventsOverviewWrapper');
            var currentEventsList = $('<ul/>').attr('id', 'currentEventsList');
            var comingEventsList = $('<ul/>').attr('id', 'comingEventsList');
            var currentEvents = $('<div/>').append($('<h4/>').text('Current Events')).append(currentEventsList).addClass('currentEvents');
            var comingEvents = $('<div/>').append($('<h4/>').text('Coming Events')).append(comingEventsList).addClass('comingEvents');

            mainContentEl.append(eventsOverview);

            var dateToday = new Date();
            var diffInTime;
            var diffInDays;

            var counter = 0;

            scope.events_array.forEach(
                function (element, index) {
                    var eventStartDate = new Date(element.start);
                    var eventEndDate = new Date(element.end);

                    diffInTime = eventStartDate.getTime() - dateToday.getTime();
                    diffInDays = diffInTime / (1000 * 3600 * 24);

                    var name = element.title;
                    var start = element.start;

                    var nameEl = $('<div/>').text(name).addClass('eventName');
                    var startLabel = $('<div/>').text(moment(start).format('YYYY-MM-DD'));

                    var eventLine = $('<li/>').append(nameEl).append(startLabel);
                    if (diffInDays > 0 && diffInDays < 60) {
                        comingEventsList.append(eventLine);
                        counter++;
                    } else if (eventStartDate.getTime() < dateToday.getTime() && dateToday.getTime() < eventEndDate.getTime()) {
                        currentEventsList.append(eventLine);
                    }
                }
            );
            eventsOverview.append(currentEvents).append(comingEvents);
        }
    };
}]);