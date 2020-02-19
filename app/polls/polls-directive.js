'use strict';

// Register `polls` directive, along with its associated controller and template
angular.module('polls').directive('pollsControl', ['$rootScope', function ($rootScope) {
    return {
        templateUrl: 'app/polls/polls-template.html',
        controller: 'pollsController',
        link: function (scope, elem) {
            $('#currentTabText').text('Polls');
            $('#saveIcon').hide();
            $('#reloadIcon').hide();
            $('#globalIcon').hide();
            $('.pollsModal').hide();
            var counter = 0;
            if ($rootScope.deregisterEditedListener) {
                $rootScope.deregisterEditedListener();
            }

            if ($rootScope.deregisterCreatedListener) {
                $rootScope.deregisterCreatedListener();
            }

            $('#newPollIcon').click(function () {
                $('.pollsModal').show();
                counter = 0;
            });

            $('.btn-close').on('click', function () {
                $('.pollsModal').hide();
                counter = 0;
            });

            function pollConfirm() {
                $('#pendingPolls').empty();
                $('.pollsModal').hide();
                $('#newPollOptions').empty();
                $('#newPollName').clear();
                var option_rows = $('.optionRow');
                console.log(option_rows);
                var option_rows_array = [];

                var pollId = scope.polls_array[scope.polls_array.length - 1].id + 1;

                scope.polls_array.push({
                    id: pollId,
                    name: $('#newPollName')[0].value
                });

                scope.newPolls.push({
                    id: pollId,
                    name: $('#newPollName')[0].value
                });

                for (var i = 0; i < option_rows.length; i++) {
                    option_rows_array.push(option_rows[i]);
                }

                option_rows_array.forEach(function (row, index) {
                    scope.polls_options_array.push({
                        id: option_rows_array.length,
                        start: row.children[4].value,
                        end: row.children[6].value,
                        pollFk: pollId,
                        name: row.children[2].value,
                        count: 0
                    });
                    scope.newPollsOptions.push({
                        start: row.children[4].value,
                        end: row.children[6].value,
                        pollFk: pollId,
                        name: row.children[2].value,
                        count: 0
                    });
                });

                scope.setPollsOptions();
                scope.setPolls();
                scope.setNewPolls();
                scope.setNewPollsOptions();
                scope.savePolls();


            }

            scope.pollConfirm = pollConfirm;

            scope.$watch('polls_array', function (newVal) {
                newVal.forEach(function (item, index) {
                    var pollDiv = $('<div/>').addClass('pollDiv').text(item.name)
                        .click(function (event) {
                            $('.pollDiv').removeClass('pollClicked');
                            $(this).addClass('pollClicked');
                            var pollQuest = $('<span/>').attr('id', 'question').text(item.name);
                            $('#container').empty().append(pollQuest);
                            scope.polls_options_array.forEach(function (option, index) {
                                var optionDiv = $('<div/>');
                                if (item.id == option.pollFk) {
                                    var optionSpan = $('<span/>').text(option.count);
                                    if (option.count > 0) {
                                        var value = 30 + (option.count * 10);
                                        optionDiv.css('width', value+'%');
                                    }
                                    var optionVoteButton = $('<a/>').text('Vote')
                                        .click(function() {
                                            if (window.confirm('Do you want to vote for this option?')) {
                                                option.count++;
                                                $(this).parent().animate({
                                                    width: '+=10%'
                                                }, 500);
                                                $(this).prev().html(parseInt($(this).prev().html()) + 1);
                                                scope.voteCommitted(option);
                                                return false;
                                            } else {
                                                return false;
                                            }
                                        });
                                    if (option.name) {
                                        optionDiv.text(option.name);
                                    } else {
                                        optionDiv.text(option.start + ' till ' + option.end);
                                    }
                                    optionDiv.prepend(optionVoteButton).prepend(optionSpan);
                                    $('#container').append(optionDiv);
                                }
                            });
                        });
                    $('#pendingPolls').append(pollDiv);
                });
            }, true);

            scope.getPollsAndOptionsFromDB();

            $('#newPollOptionsAmount').click(function () {
                if (counter < 6) {
                    counter++;
                    var optionRow = $('<div/>').addClass('optionRow').attr('id', counter).css('margin-bottom', '2%');
                    var rowNumber = $('<label/>').text(counter).css('margin-left', '2%');
                    var title = $('<label/>').text('Name').css('margin-left', '2%');
                    var titleInput = $('<input/>').attr('type', 'text').addClass('optionTitle').css('margin-left', '2%');
                    var startDate = $('<label/>').text('start').css('margin-left', '2%');
                    var startDateInput = $('<input/>').attr('type', 'date').addClass('optionStart').css('margin-left', '2%');
                    var endDate = $('<label/>').text('end').css('margin-left', '2%');
                    var endDateInput = $('<input/>').attr('type', 'date').addClass('optionEnd').css('margin-left', '2%');

                    optionRow.append(rowNumber).append(title).append(titleInput).append(startDate).append(startDateInput).append(endDate).append(endDateInput);

                    $('#newPollOptions').append(optionRow);
                }
            });
        }
    };
}]);