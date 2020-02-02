'use strict';

// Register `calendar` service
angular.module('calendar').factory('calendarService', ['$rootScope', '$http', function ($rootScope, $http) {
    var events_array = $rootScope.events_array;
    var changed_new_events = [];
    var deleted_events = [];
    var clickedEvent = {};

    function getDeletedEvents() {
        return deleted_events;
    }

    function getChangedEvents() {
        return changed_new_events;
    }

    function getEvents() {
        events_array = $rootScope.events_array;
        return events_array;
    }

    function getClickedEvent() {
        return clickedEvent;
    }

    function editEvent(modalInput) {
        clickedEvent.title = modalInput.title;
        clickedEvent.start = modalInput.start;
        clickedEvent.end = modalInput.end;
        clickedEvent.color = modalInput.color;
        clickedEvent.textColor = modalInput.textColor;
        clickedEvent.startTime = modalInput.startTime;
        clickedEvent.endTime = modalInput.endTime;
        clickedEvent.id = modalInput.id;

        events_array[clickedEvent.id - 1].title = modalInput.title;
        events_array[clickedEvent.id - 1].start = modalInput.start;
        events_array[clickedEvent.id - 1].startTime = modalInput.startTime;
        events_array[clickedEvent.id - 1].end = modalInput.end;
        events_array[clickedEvent.id - 1].endTime = modalInput.endTime;
        events_array[clickedEvent.id - 1].color = modalInput.color;
        events_array[clickedEvent.id - 1].textColor = modalInput.textColor;

        $rootScope.$emit('eventEdited', clickedEvent);
    }

    function createEvent(modalInput) {
        modalInput.id = events_array.length + 1;

        if (events_array.length !== modalInput.id) ;
        {
            changed_new_events.push({
                id: modalInput.id,
                title: modalInput.title,
                start: modalInput.start,
                end: modalInput.end,
                startTime: modalInput.startTime,
                endTime: modalInput.endTime,
                allDay: modalInput.allDay,
                color: modalInput.color,
                textColor: modalInput.textColor,
                userFk: $rootScope.userId
            });

            events_array.push({
                id: modalInput.id,
                title: modalInput.title,
                start: modalInput.start,
                end: modalInput.end,
                startTime: modalInput.startTime,
                endTime: modalInput.endTime,
                allDay: modalInput.allDay,
                color: modalInput.color,
                textColor: modalInput.textColor,
                userFk: $rootScope.userId
            });

            $rootScope.$emit('eventCreated', modalInput);
        }
    }

    function deleteEvents(event) {
        events_array.splice(event.id - 1, 1);
        deleted_events.push({
            id: event.id,
            userFk: event.userFk
        });
    }

    $rootScope.deregisterLoadListener = $rootScope.$on('loadEvents', function (event, args) {
        loadEvents();
    });


    function loadEvents() {
        if ($rootScope.userId) {
            try {
                $http.post('/load_events', {userId: $rootScope.userId})
                    .then(function (response) {
                        if (events_array.length == 0) {

                            response.data.forEach(function (item, index) {
                                var newEvent = {
                                    id: item.id,
                                    title: item.title,
                                    start: item.startdate,
                                    end: item.enddate,
                                    startTime: item.starttime,
                                    endTime: item.endtime,
                                    allDay: undefined,
                                    color: item.color,
                                    textColor: item.textcolor,
                                    userFk: item.userFk
                                };
                                events_array.push(newEvent);
                            });
                        }
                        $rootScope.$emit('eventsLoaded');
                    });
            } catch (err) {
                throw err;
            }
        }
    }

    function saveEvents() {
        console.log(changed_new_events);
        $http.post('/save_events', {new_events: changed_new_events, deleted_events: deleted_events})
            .then(function (response) {
                console.log(response);
                $rootScope.$emit('saveComplete');
            });
    }

    return {
        getEvents: getEvents,
        getClickedEvent: getClickedEvent,
        editEvent: editEvent,
        createEvent: createEvent,
        loadEvents: loadEvents,
        saveEvents: saveEvents,
        getChangedEvents: getChangedEvents,
        getDeletedEvents: getDeletedEvents,
        deleteEvents: deleteEvents
    };

}]);