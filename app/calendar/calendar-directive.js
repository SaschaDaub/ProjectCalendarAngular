'use strict';

// Register `calendar` directive, along with its associated controller and template
angular.module('calendar').directive('calendarControl', ['$rootScope', function ($rootScope) {
    return {
        templateUrl: 'app/calendar/calendar-template.html',
        controller: 'calendarController',
        link: function (scope, elem) {
            var $modal = $('.modal');
            var $close = $('.btn-close');
            if($rootScope.deregisterPollListener) {
                $rootScope.deregisterPollListener();
            }

            $('#currentTabText').text('Calendar');
            if ($('#globalIcon').hasClass('active')) {
                $('#globalIcon').removeClass('active');
            }

            if ($('#saveIcon').length == 0) {
                var saveIcon = $('<i/>').addClass('fas fa-save').attr('id', 'saveIcon').attr('title', 'Save new or changed data on the calendar.')
                    .click(function () {
                        scope.saveEvents();
                    });
                $('#topBar').append(saveIcon);
            } else {
                $('#saveIcon').show();
            }

            if ($('#reloadIcon').length == 0) {
                var reloadIcon = $('<i/>').addClass('fas fa-sync-alt active').attr('id', 'reloadIcon').attr('title', 'reload the calendar.')
                    .click(function () {
                        $('#calendar').hide();
                        $('#calendar').fullCalendar('removeEvents');
                        $('#calendar').fullCalendar('renderEvents', scope.events_array, true);
                        if($('#globalIcon').hasClass('active')) {
                            $('#calendar').fullCalendar('renderEvents', scope.global_events, true);
                        }
                        $('#calendar').show();
                    });
                $('#topBar').append(reloadIcon);
            } else {
                $('#reloadIcon').show();
            }

            if ($('#globalIcon').length == 0) {
                var globalIcon = $('<i/>').addClass('fas fa-globe-europe').attr('id', 'globalIcon').attr('title', 'activate or deactivate showing global events on the calendar.')
                    .click(function () {
                        if ($('#globalIcon').hasClass('active')) {
                            $('#globalIcon').removeClass('active');
                            scope.global_events.forEach(function(event, index) {
                                $('#calendar').fullCalendar('removeEvents', event.id);
                            });
                        } else {
                            $('#globalIcon').addClass('active');
                            $('#calendar').fullCalendar('renderEvents', scope.global_events, true);
                        }
                    });
                $('#topBar').append(globalIcon);
            } else {
                $('#globalIcon').show();
            }

            $rootScope.deregisterEditedListener = $rootScope.$on('eventEdited', function (event, args) {
                $('#calendar').fullCalendar('updateEvent', args);
                $modal.hide();
                if (!$('#saveIcon').hasClass('active')) {
                    $('#saveIcon').addClass('active');
                }
            });

            $rootScope.deregisterCreatedListener = $rootScope.$on('eventCreated', function (event, args) {
                $('#calendar').fullCalendar('renderEvent', args, true);
                $modal.hide();
                if (!$('#saveIcon').hasClass('active')) {
                    $('#saveIcon').addClass('active');
                }
            });

            $rootScope.$on('saveComplete', function () {
                if ($('#saveIcon').hasClass('active')) {
                    $('#saveIcon').removeClass('active');
                }
            });

            $rootScope.$on('eventsLoaded', function () {
                scope.getEvents();
                $('#calendar').fullCalendar({
                    plugins: ['interaction', 'dayGrid', 'moment'],
                    height: 'parent',
                    contentHeight: 'auto',
                    header: {
                        left: 'month agendaWeek agendaDay',
                        center: 'today prev,next',
                        right: 'title'
                    },
                    editable: true,
                    selectable: true,
                    selectHelper: true,
                    eventLimit: true,
                    events: scope.events_array,
                    select: function (start, end) {

                        if ($('#delete-button').length > 0) {
                            $('#delete-button').remove();
                        }

                        $('.modal').attr('usage', 'add');

                        var windowHeight = $(window).height(),
                            windowWidth = $(window).width(),
                            modalWidth = windowWidth / 4;

                        $('.modal-header').removeClass('modal-edit');

                        $('#newEventTitle')[0].value = '';

                        $('.modal-title').text('Add New Event');

                        $close.on('click', function () {
                            $('.modal').hide();
                        });

                        $('#newEventStartDate')[0].value = moment(start).format();
                        $('#newEventEndDate')[0].value = moment(end).format();
                        $('#newEventStartTime').val('');
                        $('#newEventEndTime').val('');
                        $('#newEventColor')[0].value = "#0096ff";
                        $('#newEventTextColor')[0].value = "#ffffff";

                        $modal.show();
                    },

                    eventDrop: function (event, delta, revertFunc) {
                        scope.events_array.forEach(function (item, index) {
                            if (event.id == item.id) {
                                item.start = event.start;
                                item.end = event.end;
                            }
                        });
                        $('#calendar').fullCalendar('updateEvent', event);
                    },

                    eventClick: function (event, element) {
                        $('.modal').attr('usage', 'edit');
                        $('.modal-title').text('Edit Event: ' + event.title);
                        $('.modal-header').addClass('modal-edit');

                        if ($('#delete-button').length === 0) {
                            var deleteButton = $('<button>').attr('id', 'delete-button')
                                .text('Delete')
                                .addClass('btn')
                                .click(function () {
                                    $('#calendar').fullCalendar('removeEvents', event.id);
                                    $('#saveIcon').addClass('active');
                                    scope.deleteEvents(event);
                                    $modal.hide();
                                    $(this).remove();
                                });
                            $('.modal-footer').append(deleteButton);
                        }

                        $close.on('click', function () {
                            $('.modal').hide();
                        });

                        $('#newEventTitle')[0].value = event.title;
                        $('#newEventStartDate')[0].value = moment(event.start).format('YYYY-MM-DD');
                        $('#newEventEndDate')[0].value = moment(event.end).format('YYYY-MM-DD');
                        $('#newEventStartTime')[0].value = moment(event.start).format('HH:mm');
                        $('#newEventEndTime')[0].value = moment(event.end).format('HH:mm');
                        $('#newEventColor')[0].value = event.color;
                        $('#newEventTextColor')[0].value = event.textColor;
                        $('#newEventGlobal')[0].checked = event.global;
                        event.saveId = event.id;
                        $rootScope.clickedEvent = event;

                        $modal.show();
                    }
                });
                $('#calendar').fullCalendar('removeEvents');
                $('#calendar').fullCalendar('renderEvents', scope.events_array, true);
            });
        }
    };
}]);